const youtuber1 = {
    id: 1,
    channelName: 'AwesomeChannel',
    subscriberCount: 1500000,
    videoCount: 120,
};

const youtuber2 = {
    id: 2,
    channelName: 'TechChannel',
    subscriberCount: 500000,
    videoCount: 80,
};

const youtuber3 = {
    id: 3,
    channelName: 'FoodChannel',
    subscriberCount: 1200000,
    videoCount: 220,
};

// 1. Map 객체 생성
const myMap = new Map();

// 2. Map에 데이터 추가하기 (set)
myMap.set('name', 'Alice');
myMap.set('age', 25);
myMap.set(true, 'This is a boolean key');
myMap.set({ id: 1 }, 'This is an object key');

myMap.set(1, youtuber1);
myMap.set(2, youtuber2);
myMap.set(3, youtuber3);

const api_test_02 = (req, res) => {
    const { id } = req.params;

    console.log('id:', id);

    // id를 숫자로 변환 후 Map에서 해당 값 찾기
    const youtuber = myMap.get(parseInt(id));

    if (youtuber) {
        // Map 상태 확인
        console.log('Map 내용:', myMap);
        res.json(youtuber);
    }
    else if (!youtuber) {
        res.json('대상을 찾을 수 없습니다.');
    }
};

module.exports = { api_test_02 };