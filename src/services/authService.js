const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
    const [result] = await db.execute(query, [email, hashedPassword]);
    return result.insertId;
};

exports.login = async (email, password) => {
    const query = 'SELECT id, password_hash FROM users WHERE email = ?';
    const [rows] = await db.execute(query, [email]);
    if (rows.length === 0) {
        throw new Error('존재하지 않는 사용자입니다.');
    }

    const { id, password_hash } = rows[0];
    const isValid = await bcrypt.compare(password, password_hash);
    if (!isValid) {
        throw new Error('잘못된 비밀번호입니다.');
    }

    const token = jwt.sign({ id }, 'secret_key', { expiresIn: '1h' });
    return token;
};

exports.resetPassword = async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = 'UPDATE users SET password_hash = ? WHERE email = ?';
    const [result] = await db.execute(query, [hashedPassword, email]);
    if (result.affectedRows === 0) {
        throw new Error('존재하지 않는 이메일 계정입니다.');
    }
};
