exports.getProfile = (req, res) => {
    res.json({
      id: 1,
      name: "John Doe",
      email: "user@example.com",
      join_date: "2024-01-01",
    });
  };
  
  exports.updateProfile = (req, res) => {
    const { name, email } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ error: "Invalid profile data" });
    }
  
    res.json({ message: "프로필이 성공적으로 업데이트되었습니다." });
  };
  