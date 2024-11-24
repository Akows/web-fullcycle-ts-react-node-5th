const { memberDatabase } = require("../data/data");

let id = 1;

const loginMember = (req, res) => {
    
};

const createMember = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        memberDatabase.set(id++, req.body);
        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } 
    else {
        res.status(404).json({ message: '에러가 발생하였습니다.' });
    }
};

const getMemberData = (req, res) => {
    const id = parseInt(req.params.id);
    
    if (memberDatabase.has(id)) {
        const member = memberDatabase.get(id);
        res.status(200).json({ id, ...member });
    } 
    else {
        res.status(404).json({ message: "회원 정보를 찾을 수 없습니다." });
    }
};

const deleteMember = (req, res) => {
    // 구조분해할당으로 id값 바로 빼오기
    const { id } = req.params;
    const index = parseInt(id);

    const user = memberDatabase.get(index)
    if (user) {
        memberDatabase.delete(index);
        res.status(200).json({ message: `${user.name}님, 지금까지 감사했습니다.` });
    } 
    else {
        res.status(404).json({ message: `ID ${index}의 회원 정보를 찾을 수 없습니다.` });
    }
};


module.exports = { 
    loginMember,
    createMember,
    getMemberData,
    deleteMember
};
