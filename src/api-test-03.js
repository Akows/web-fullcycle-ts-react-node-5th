const youtuber1 = {
    channelName: 'AwesomeChannel',
    subscriberCount: 1500000,
    videoCount: 120,
};

const youtuber2 = {
    channelName: 'TechChannel',
    subscriberCount: 500000,
    videoCount: 80,
};

const youtuber3 = {
    channelName: 'FoodChannel',
    subscriberCount: 1200000,
    videoCount: 220,
};

const myMap = new Map();
myMap.set(1, youtuber1);
myMap.set(2, youtuber2);
myMap.set(3, youtuber3);

let currentId = myMap.size + 1;

const api_test_03 = (req, res) => {

    if (!req) {
        res.json('요청 정보가 존재하지 않습니다.');
        return;
    }

    myMap.set(currentId, req.body);
    console.log(myMap);
    res.json(`${currentId}번 - 새 유튜버 등록이 정상적으로 완료되었습니다.`);
    currentId++;
};

const api_test_03_1 = (req, res) => {
    if (!req) {
        res.json('요청 정보가 존재하지 않습니다.');
        return;
    }

    // Map 객체를 Object로 변환
    const mapAsJson = Object.fromEntries(myMap);

    // JSON 형식으로 반환
    res.json(mapAsJson);
};

module.exports = { api_test_03, api_test_03_1 };
