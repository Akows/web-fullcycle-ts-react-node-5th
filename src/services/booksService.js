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
