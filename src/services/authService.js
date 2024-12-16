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
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(query, [email]);

    if (rows.length === 0) {
        throw new Error('존재하지 않는 이메일입니다.');
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 액세스 토큰 생성
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

    // 리프레시 토큰 생성
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });

    // 리프레시 토큰 저장
    const updateQuery = 'UPDATE users SET refresh_token = ? WHERE id = ?';
    await db.execute(updateQuery, [refreshToken, user.id]);

    return { accessToken, refreshToken };
};


exports.resetPassword = async (email, newPassword) => {
    // 사용자 존재 여부 확인
    const userCheckQuery = 'SELECT id FROM users WHERE email = ?';
    const [users] = await db.execute(userCheckQuery, [email]);
    if (users.length === 0) {
        throw new Error('존재하지 않는 이메일 계정입니다.');
    }

    // 비밀번호 업데이트
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = 'UPDATE users SET password_hash = ? WHERE email = ?';
    const [result] = await db.execute(updateQuery, [hashedPassword, email]);

    if (result.affectedRows === 0) {
        throw new Error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
};

exports.verifyRefreshTokenAndGenerateAccessToken = async (refreshToken) => {
    try {
        // 리프레시 토큰 검증
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

        // 데이터베이스에서 리프레시 토큰 유효성 확인
        const query = 'SELECT * FROM users WHERE id = ? AND refresh_token = ?';
        const [rows] = await db.execute(query, [decoded.id, refreshToken]);

        if (rows.length === 0) {
            throw new Error('유효하지 않은 리프레시 토큰입니다.');
        }

        // 새로운 액세스 토큰 생성
        return jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    } catch (error) {
        console.error('Error in verifyRefreshTokenAndGenerateAccessToken:', error.name, error.message);
        throw new Error('리프레시 토큰 검증 실패');
    }
};