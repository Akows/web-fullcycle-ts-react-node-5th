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

const api_test_01 = (req, res) => {
    const channelName = req.params.channelName;

    if (channelName === 'AwesomeChannel') {
        res.json(youtuber1);
    } 
    else if (channelName === 'TechChannel') {
        res.json(youtuber2);
    }
    else if (channelName === 'FoodChannel') {
        res.json(youtuber3);      
    }
    else {
        res.json('존재하지 않는 대상입니다.');
    }
};

module.exports = { api_test_01 };
