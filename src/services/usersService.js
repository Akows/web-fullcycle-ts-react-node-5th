const db = require('../config/database');

exports.getProfile = async (userId) => {
    const query = 'SELECT id, name, email, join_date FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [userId]);
    if (rows.length === 0) {
        throw new Error('사용자 정보가 존재하지 않습니다.');
    }
    return rows[0];
};

exports.updateProfile = async (userId, name, email) => {
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const [result] = await db.execute(query, [name, email, userId]);
    if (result.affectedRows === 0) {
        throw new Error('프로필 업데이트에 실패했습니다.');
    }
};
