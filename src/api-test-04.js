// 데이터 삽입 코드
const youtubers = [
    { id: 1, data: { channelName: 'AwesomeChannel', subscriberCount: 1500000, videoCount: 120 } },
    { id: 2, data: { channelName: 'TechChannel', subscriberCount: 500000, videoCount: 80 } },
    { id: 3, data: { channelName: 'FoodChannel', subscriberCount: 1200000, videoCount: 220 } },
];

const myMap = new Map();
youtubers.forEach(({ id, data }) => {
    myMap.set(id, data);
});

let currentId = myMap.size + 1;

// 요청 데이터가 존재하는지, 데이터베이스가 비어있지 않은지 체크하는 함수
const validateReqOrMap = (req, res, myMap) => {
    if (!req) {
        res.json('요청 정보가 존재하지 않습니다.');
        return false;
    }

    if (myMap.size === 0) {
        res.json('채널 데이터가 존재하지 않습니다.');
        return false;
    }

    return true;
};


const getChannelData = (req, res) => {
    
    if (!validateReqOrMap(req, res, myMap)) {
        return;
    }

    const mapAsJson = Object.fromEntries(myMap);

    res.json(mapAsJson);
};

const createChannel = (req, res) => {

    if (!req) {
        res.json('요청 정보가 존재하지 않습니다.');
        return;
    }

    myMap.set(currentId, req.body);
    console.log(myMap);
    res.json(`${currentId}번 - 새 유튜버 등록이 정상적으로 완료되었습니다.`);
    currentId++;
};

const deleteChannel = (req, res) => {
    const { id } = req.params;
    const index = parseInt(id);

    if (!validateReqOrMap(req, res, myMap)) {
        return;
    }

    // 사용자가 입력한 id 값이 myMap의 key에 존재하는지 확인
    if (myMap.has(index)) {
        myMap.delete(index);
        res.json({ message: `${id}번 채널이 삭제되었습니다.`});
    } 
    else {
        res.status(404).json({ message: `${id}번 채널은 존재하지 않는 채널입니다.` });
    }
};

const deleteAllChannel = (req, res) => {
    if (!validateReqOrMap(req, res, myMap)) {
        return;
    }

    myMap.clear();
    res.json({ message: `모든 채널이 삭제되었습니다.`});
};

const updateChannel = (req, res) => {
    const { id } = req.params;
    const index = parseInt(id);
    const updatedData = req.body;

    if (!req) {
        res.json('요청 정보가 존재하지 않습니다.');
        return;
    }

    if (myMap.has(index)) {
        // 기존 데이터를 가져온다
        const existingData = myMap.get(index);
        // 스프레드 문법을 활용
        // 우선 기존 데이터를 깔아주고, 수정할 데이터를 추가해준다
        // 서로 겹치는 부분은 updatedData로 덮어씌워지고
        // 겹치지 않는 부분은 existingData가 그대로 유지된다
        const newData = { ...existingData, ...updatedData }; // 기존 데이터와 새로운 데이터를 병합
        
        // 수정이 완료된 새 데이터를 삽입해준다
        myMap.set(index, newData);
        res.json({ message: `${id}번 채널이 수정되었습니다.`});
    } 
    else {
        res.status(404).json({ message: `${id}번 채널은 존재하지 않는 채널입니다.` });
    }
};

const api_test_04_GetChannelName = (req, res) => {

    // Map 객체를 배열로 변환하고 (values값만 뽑아서)
    // subscriberCount를 기준으로 정렬해주고
    // channelName만 추출해서 새 배열로 만들기
    const result = Array.from(myMap.values())
    .sort((a, b) => b.subscriberCount - a.subscriberCount)
    .map((channel) => channel.channelName);

    // 만들어진 배열을 res
    res.json(result);
};



module.exports = { getChannelData, createChannel, deleteChannel, deleteAllChannel, updateChannel, api_test_04_GetChannelName };
