const db = require('../config/database');

// 도서 목록 조회 + 카테고리 정보 추가
exports.getBooks = async () => {
    const query = `
        SELECT 
            books.id AS book_id,
            books.title,
            books.author,
            books.summary,
            books.description,
            books.table_of_contents,
            books.price,
            books.likes,
            books.publish_date,
            books.image_url,
            categories.id AS category_id,
            categories.name AS category_name
        FROM books
        JOIN categories ON books.category_id = categories.id
    `;
    const [rows] = await db.execute(query);
    return rows;
};

// 특정 도서 상세 조회 + 카테고리 정보 추가
exports.getBookById = async (id) => {
    const query = `
        SELECT 
            books.id AS book_id,
            books.title,
            books.author,
            books.summary,
            books.description,
            books.table_of_contents,
            books.price,
            books.likes,
            books.publish_date,
            books.image_url,
            categories.id AS category_id,
            categories.name AS category_name
        FROM books
        JOIN categories ON books.category_id = categories.id
        WHERE books.id = ?
    `;
    const [rows] = await db.execute(query, [id]);
    if (rows.length === 0) {
        throw new Error('존재하지 않는 도서입니다.');
    }
    return rows[0];
};

// 특정 카테고리별 도서 목록 조회 + 카테고리 정보 추가
exports.getBooksByCategory = async (categoryId) => {
    const query = `
        SELECT 
            books.id AS book_id,
            books.title,
            books.author,
            books.summary,
            books.description,
            books.table_of_contents,
            books.price,
            books.likes,
            books.publish_date,
            books.image_url,
            categories.id AS category_id,
            categories.name AS category_name
        FROM books
        JOIN categories ON books.category_id = categories.id
        WHERE books.category_id = ?
    `;
    const [rows] = await db.execute(query, [categoryId]);
    return rows;
};

exports.getFilteredBooks = async (page = 1, limit = 10, categoryId = null, isNew = false) => {
    // 페이지와 항목 수를 기반으로 페이징을 위한 OFFSET 계산
    const offset = (page - 1) * limit;

    // 기본 SELECT 쿼리: 도서 데이터와 해당 카테고리 이름을 JOIN하여 가져옴
    let query = `
        SELECT 
            books.id AS book_id,                -- 도서 ID
            books.title,                       -- 도서 제목
            books.author,                      -- 저자 이름
            books.summary,                     -- 요약 정보
            books.description,                 -- 상세 설명
            books.table_of_contents,           -- 목차 정보(JSON 형식)
            books.price,                       -- 가격
            books.likes,                       -- 좋아요 수
            books.publish_date,                -- 출판일
            books.image_url,                   -- 이미지 URL
            categories.name AS category_name   -- 카테고리 이름
        FROM books
        JOIN categories ON books.category_id = categories.id
    `;

    // 총 항목 수를 가져오는 COUNT 쿼리
    let countQuery = `SELECT COUNT(*) AS total_count FROM books JOIN categories ON books.category_id = categories.id`;

    const params = []; // 쿼리에 전달할 파라미터 배열

    // (1) 카테고리 필터링 (categoryId가 제공된 경우)
    if (categoryId) {
        query += ` WHERE books.category_id = ?`;       // SELECT 쿼리에 WHERE 조건 추가
        countQuery += ` WHERE books.category_id = ?`;  // COUNT 쿼리에도 동일 조건 추가
        params.push(categoryId);                       // categoryId를 파라미터로 추가
    }

    // (2) 신간 여부 정렬 (isNew가 true인 경우)
    if (isNew) {
        // 카테고리 필터링 조건이 추가된 경우 AND로 연결, 없으면 WHERE로 시작
        query += categoryId ? ` AND` : ` WHERE`;
        query += ` books.publish_date IS NOT NULL ORDER BY books.publish_date DESC`; // 출판일 기준 내림차순 정렬
    }

    // (3) 페이징 조건 추가
    query += ` LIMIT ? OFFSET ?`;  // LIMIT과 OFFSET을 추가하여 페이징 구현
    params.push(limit, offset);    // limit(페이지당 항목 수)와 offset(시작 위치)을 파라미터로 추가

    // (4) 데이터 조회 쿼리 실행
    const [rows] = await db.execute(query, params);

    // (5) 총 항목 수 조회 쿼리 실행
    const [[countResult]] = await db.execute(countQuery, categoryId ? [categoryId] : []);

    // (6) 결과 반환: 총 항목 수, 총 페이지 수, 현재 페이지, 조회된 도서 데이터
    return {
        total_count: countResult.total_count,          // 전체 항목 수
        total_pages: Math.ceil(countResult.total_count / limit), // 전체 페이지 수
        current_page: page,                           // 현재 페이지 번호
        books: rows,                                  // 조회된 도서 데이터
    };
};

// 좋아요 추가 기능
exports.addLike = async (userId, bookId) => {
    // 데이터베이스 연결을 가져옵니다. 트랜잭션을 사용하기 위해 connection 객체를 활용합니다.
    const connection = await db.getConnection();
    try {
        // 트랜잭션 시작
        await connection.beginTransaction();

        // 1. book_id가 유효한지 확인합니다.
        //    - EXISTS 서브쿼리를 사용하여 books 테이블에 해당 book_id가 존재하는지 확인합니다.
        //    - EXISTS는 조건을 만족하는 첫 번째 레코드를 찾으면 즉시 종료하므로 성능이 좋습니다.
        const checkQuery = `
            SELECT EXISTS (
                SELECT 1 FROM books WHERE id = ?
            ) AS book_exists
        `;
        const [[{ book_exists }]] = await connection.execute(checkQuery, [bookId]);
        if (!book_exists) {
            throw new Error('존재하지 않는 도서 ID입니다.'); // 도서 ID가 유효하지 않으면 에러를 던집니다.
        }

        // 2. 좋아요 추가
        //    - likes 테이블에 user_id와 book_id를 삽입합니다.
        //    - FOREIGN KEY 제약 조건으로 인해 user_id와 book_id가 각각 users, books 테이블에 존재해야 합니다.
        const likeQuery = `INSERT INTO likes (user_id, book_id) VALUES (?, ?)`;
        await connection.execute(likeQuery, [userId, bookId]);

        // 3. books 테이블의 좋아요 수 업데이트
        //    - COUNT()를 사용하여 likes 테이블에서 해당 book_id의 좋아요 개수를 계산합니다.
        //    - 계산된 값을 books 테이블의 likes 필드에 업데이트합니다.
        const updateQuery = `
            UPDATE books
            SET likes = (
                SELECT COUNT(*) FROM likes WHERE book_id = ?
            )
            WHERE id = ?
        `;
        await connection.execute(updateQuery, [bookId, bookId]);

        // 트랜잭션 커밋: 모든 작업이 성공적으로 수행되었으므로 변경 사항을 확정합니다.
        await connection.commit();
    } catch (error) {
        // 트랜잭션 롤백: 오류 발생 시 모든 변경 사항을 취소합니다.
        await connection.rollback();
        throw error; // 에러를 호출한 곳으로 다시 전달합니다.
    } finally {
        // 데이터베이스 연결 해제: 사용한 connection 객체를 반환합니다.
        connection.release();
    }
};

// 좋아요 삭제 기능
exports.removeLike = async (userId, bookId) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. 좋아요가 존재하는지 확인합니다.
        //    - EXISTS 서브쿼리를 사용하여 likes 테이블에 해당 user_id와 book_id 조합이 있는지 확인합니다.
        const checkQuery = `
            SELECT EXISTS (
                SELECT 1 FROM likes WHERE user_id = ? AND book_id = ?
            ) AS like_exists
        `;
        const [[{ like_exists }]] = await connection.execute(checkQuery, [userId, bookId]);
        if (!like_exists) {
            throw new Error('좋아요가 존재하지 않습니다.'); // 좋아요가 없으면 에러를 던집니다.
        }

        // 2. 좋아요 삭제
        //    - likes 테이블에서 user_id와 book_id가 일치하는 레코드를 삭제합니다.
        const deleteQuery = `DELETE FROM likes WHERE user_id = ? AND book_id = ?`;
        await connection.execute(deleteQuery, [userId, bookId]);

        // 3. books 테이블의 좋아요 수 업데이트
        //    - COUNT()를 사용하여 likes 테이블에서 해당 book_id의 좋아요 개수를 다시 계산합니다.
        const updateQuery = `
            UPDATE books
            SET likes = (
                SELECT COUNT(*) FROM likes WHERE book_id = ?
            )
            WHERE id = ?
        `;
        await connection.execute(updateQuery, [bookId, bookId]);

        // 트랜잭션 커밋
        await connection.commit();
    } catch (error) {
        // 트랜잭션 롤백
        await connection.rollback();
        throw error;
    } finally {
        // 데이터베이스 연결 해제
        connection.release();
    }
};

// 좋아요 여부 확인 기능
exports.checkLike = async (userId, bookId) => {
    // SQL 쿼리: likes 테이블에 user_id와 book_id 조합이 존재하는지 확인합니다.
    const query = `
        SELECT EXISTS (
            SELECT 1 FROM likes WHERE user_id = ? AND book_id = ?
        ) AS is_liked
    `;
    // 쿼리를 실행하여 결과를 가져옵니다.
    const [[{ is_liked }]] = await db.execute(query, [userId, bookId]);

    // EXISTS 결과는 1 또는 0으로 반환되므로, 1이면 true, 0이면 false를 반환합니다.
    return is_liked === 1;
};
