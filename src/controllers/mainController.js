exports.getMainPageData = (req, res) => {
    res.json({
      banners: [
        "http://example.com/banner1.jpg",
        "http://example.com/banner2.jpg",
      ],
      new_books: [
        {
          id: 1,
          title: "New Book Title",
          author: "Author Name",
          price: 12000,
          image_url: "http://example.com/newbook1.jpg",
        },
      ],
      recommended_books: [
        {
          id: 3,
          title: "Recommended Book",
          author: "Author A",
          price: 20000,
          image_url: "http://example.com/recommended1.jpg",
          likes: 50,
        },
      ],
    });
  };
  