// 1. Map 객체 생성
const myMap = new Map();

// 2. Map에 데이터 추가하기 (set)
myMap.set('name', 'Alice');
myMap.set('age', 25);
myMap.set(true, 'This is a boolean key');
myMap.set({ id: 1 }, 'This is an object key');

const api_test_02 = (req, res) => {
    // Map 상태 확인
    console.log('Map 내용:', myMap);
};

module.exports = { api_test_02 };