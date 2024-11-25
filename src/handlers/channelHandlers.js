const { channelDatabase } = require('../data/data');

let id = 1;

const getChannelsData = (req, res) => {
    const channels = [];

    // Map 객체 순회하여 데이터를 배열로 변환
    channelDatabase.forEach((channel, id) => {
        channels.push(channel);
    });

    res.status(200).json({
        message: '채널 데이터가 성공적으로 반환되었습니다.',
        channels,
    });
};


const getChannelData  = (req, res) => {
    // getMemberData와 동일
    res.status(200).json({ message: '채널 데이터 반환..'});
};

const createChannel  = (req, res) => {
    // foundMember와 동일
    res.status(200).json({ message: '채널 생성 완료..'});
};

const updateChannel = (req, res) => {
    const id = parseInt(req.params.id);

    // 채널이 존재하는지 확인
    const existingChannel = channelDatabase.get(id);
    if (!existingChannel) {
        return res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
    }

    // 요청 데이터 검증
    const { channelTitle, subscribers } = req.body;
    if (!channelTitle || subscribers === undefined) {
        return res.status(400).json({ message: '채널 제목과 구독자 수를 모두 입력해주세요.' });
    }

    // 기존 데이터와 새 데이터를 병합
    const updatedChannel = {
        ...existingChannel,
        channelTitle,
        subscribers
    };

    // 데이터베이스 업데이트
    channelDatabase.set(id, updatedChannel);

    return res.status(200).json({ message: '채널 정보 수정이 완료되었습니다.', channel: updatedChannel });
};


const deleteChannel = (req, res) => {
    // deleteMember와 동일
    res.status(200).json({ message: '채널 삭제 완료..'});
};

module.exports = { 
    getChannelsData,
    getChannelData,
    createChannel,
    updateChannel,
    deleteChannel
};
