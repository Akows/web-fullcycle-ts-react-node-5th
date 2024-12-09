exports.register = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "유효하지 않은 이메일 혹은 비밀번호입니다." });
    }
  
    res.status(201).json({ message: "회원가입이 정상적으로 완료되었습니다." });
  };
  
  exports.login = (req, res) => {
    const { email, password } = req.body;
  
    if (email === "user@example.com" && password === "securepassword") {
      res.json({ token: "jwt_token" });
    } else {
      res.status(401).json({ error: "존재하지 않는 사용자입니다." });
    }
  };
  
  exports.resetPassword = (req, res) => {
    const { email, new_password } = req.body;
  
    if (email === "user@example.com") {
      res.json({ message: "비밀번호 초기화가 정상적으로 완료되었습니다." });
    } else {
      res.status(404).json({ error: "존재하지 않는 이메일 계정입니다." });
    }
  };
  