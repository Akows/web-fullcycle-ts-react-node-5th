exports.getBooks = (req, res) => {
    res.json({
      total_count: 100,
      total_page: 10,
      current_page: 1,
      books: [
        {
          id: 1,
          title: "Book Title",
          author: "Author Name",
          summary: "Short summary",
          price: 10000,
          likes: 5,
          publish_date: "2024-01-01",
          image_url: "http://example.com/image.jpg",
        },
      ],
    });
  };
  
  exports.getBookById = (req, res) => {
    const bookId = req.params.id;
  
    if (bookId == 1) {
      res.json({
        id: 1,
        title: "Book Title",
        category: "Fiction",
        format: "Hardcover",
        author: "Author Name",
        isbn: "1234567890",
        pages: 350,
        summary: "Short summary",
        description: "Detailed description",
        table_of_contents: ["Chapter 1", "Chapter 2"],
        price: 10000,
        likes: 5,
        publish_date: "2024-01-01",
        user_liked: false,
        images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
      });
    } else {
      res.status(404).json({ error: "존재하지 않는 도서입니다." });
    }
  };
  
  exports.getBooksByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
  
    res.json({
      category_id: categoryId,
      category_name: "Fiction",
      total_count: 25,
      total_page: 5,
      current_page: 1,
      books: [
        {
          id: 11,
          title: "Bestselling Novel",
          author: "Famous Author",
          summary: "A captivating fiction story.",
          price: 15000,
          likes: 250,
          publish_date: "2024-01-01",
          image_url: "http://example.com/book11.jpg",
        },
      ],
    });
  };
  