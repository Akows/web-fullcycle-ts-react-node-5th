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
