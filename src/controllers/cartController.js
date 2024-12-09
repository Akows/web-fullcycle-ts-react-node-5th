exports.getCartItems = (req, res) => {
    res.json({
      items: [
        {
          book_id: 1,
          title: "Book Title",
          summary: "Short summary",
          price: 10000,
          quantity: 1,
          image_url: "http://example.com/image.jpg",
        },
      ],
    });
  };
  
  exports.addToCart = (req, res) => {
    const { book_id, quantity } = req.body;
  
    if (!book_id || !quantity) {
      return res.status(400).json({ error: "잘못된 요청 데이터입니다." });
    }
  
    res.status(201).json({ message: "장바구니에 상품이 추가되었습니다." });
  };
  
  exports.removeFromCart = (req, res) => {
    const bookId = req.params.bookId;
  
    if (bookId == 1) {
      res.json({ message: "장바구니에서 상품이 삭제되었습니다." });
    } else {
      res.status(404).json({ error: "장바구니에 존재하지 않는 상품입니다." });
    }
  };
  