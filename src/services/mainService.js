const db = require('../config/database');

exports.getMainPageData = async () => {
    const banners = [
        'http://example.com/banner1.jpg',
        'http://example.com/banner2.jpg',
    ];
    const queryNewBooks = 'SELECT * FROM books ORDER BY publish_date DESC LIMIT 5';
    const queryRecommendedBooks = 'SELECT * FROM books ORDER BY likes DESC LIMIT 5';

    const [newBooks] = await db.execute(queryNewBooks);
    const [recommendedBooks] = await db.execute(queryRecommendedBooks);

    return { banners, new_books: newBooks, recommended_books: recommendedBooks };
};
