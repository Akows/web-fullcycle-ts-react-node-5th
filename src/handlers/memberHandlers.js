const db = require('../config/database'); // MySQL 연결을 위한 db 설정 파일
const bcrypt = require('bcryptjs'); // 암호화 모듈
const jwt = require('jsonwebtoken');

// 로그인 기능
const loginMember = async (req, res) => {
  const { name, password } = req.body;

  try {
      const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);

      if (rows.length === 0) {
          return res.status(403).json({ message: '이름 또는 비밀번호가 올바르지 않습니다.' });
      }

      const user = rows[0];

      // 비밀번호 검증
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(403).json({ message: '이름 또는 비밀번호가 올바르지 않습니다.' });
      }

      // JWT 생성
      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.cookie('token', token, {
        httpOnly: true
      });

      return res.status(200).json({ message: '로그인 성공!', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 회원가입 기능
const createMember = async (req, res) => {
  const { email, name, password, contact } = req.body;

  try {
      const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
          return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await db.execute(
          'INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)',
          [email, name, hashedPassword, contact || null]
      );

      return res.status(201).json({ message: '회원가입이 완료되었습니다.', id: result.insertId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

  
// 모든 회원 데이터 가져오기
const getAllMembers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        if (rows.length > 0) {
        return res.status(200).json(rows);
        } else {
        return res.status(200).json({ message: '회원 데이터가 없습니다.', data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 특정 회원 정보 가져오기
const getMemberData = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);

        if (rows.length > 0) {
        return res.status(200).json(rows[0]);
        } else {
        return res.status(404).json({ message: '회원 정보를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 회원 삭제 기능
const deleteMember = async (req, res) => {
    const { id } = req.params;
    const index = parseInt(id);

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [index]);

        if (rows.length > 0) {
        const user = rows[0];
        await db.execute('DELETE FROM users WHERE id = ?', [index]);
        return res.status(200).json({ message: `${user.name}님, 지금까지 감사했습니다.` });
        } else {
        return res.status(404).json({ message: `ID ${index}의 회원 정보를 찾을 수 없습니다.` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = {
    loginMember,
    createMember,
    getAllMembers,
    getMemberData,
    deleteMember,
};
