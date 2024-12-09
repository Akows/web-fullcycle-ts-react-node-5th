exports.getOrders = (req, res) => {
    res.json({
      orders: [
        {
          order_id: 1,
          date: "2024-12-04",
          total_price: 20000,
          status: "Processing",
          items: [
            {
              book_id: 1,
              title: "Book Title",
              price: 10000,
              quantity: 1,
            },
          ],
        },
      ],
    });
  };
  
  exports.createOrder = (req, res) => {
    const { items, delivery_info } = req.body;
  
    if (!items || !delivery_info) {
      return res.status(400).json({ error: "Invalid order data" });
    }
  
    res.status(201).json({ order_id: 1, message: "Order created successfully" });
  };
  