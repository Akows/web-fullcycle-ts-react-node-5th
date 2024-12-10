const db = require('../config/database');

exports.getBooks = async () => {
    const query = 'SELECT * FROM books';
    const [rows] = await db.execute(query);
    return rows;
};

exports.getBookById = async (id) => {
    const query = 'SELECT * FROM books WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    if (rows.length === 0) {
        throw new Error('존재하지 않는 도서입니다.');
    }
    return rows[0];
};

exports.getBooksByCategory = async (categoryId) => {
    const query = 'SELECT * FROM books WHERE category_id = ?';
    const [rows] = await db.execute(query, [categoryId]);
    return rows;
};
