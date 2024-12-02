const db = require('../config/database'); // MySQL 연결을 위한 db 설정 파일

// 로그인 기능
const loginMember = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: '로그인 요청 중 에러가 발생하였습니다.' });
    }

    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: '이름과 비밀번호를 모두 입력해주세요.' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE name = ? AND password = ?',
            [name, password]
        );

        if (rows.length > 0) {
            return res.status(200).json({ message: '로그인 성공!', user: rows[0].name });
        } else {
            return res.status(401).json({ message: '이름 또는 비밀번호가 올바르지 않습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 회원가입 기능
const createMember = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: '회원가입 요청 데이터가 부족합니다.' });
    }

    const { email, name, password, contact } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: '이메일, 이름, 비밀번호를 모두 입력해주세요.' });
    }

    try {
        // 중복 이메일 검사
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' }); // 409: Conflict
        }

        // 중복 이메일이 없으면 데이터 삽입
        const [result] = await db.execute(
            'INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)',
            [email, name, password, contact || null]
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
        // 모든 회원 데이터를 조회하는 SQL 쿼리
        const [rows] = await db.execute('SELECT * FROM users');

        // 데이터가 있는 경우 반환
        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            // 데이터가 없는 경우 빈 배열 반환
            return res.status(200).json({ message: '회원 데이터가 없습니다.', data: [] });
        }
    } catch (error) {
        console.error(error);
        // 서버 오류 발생 시
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
