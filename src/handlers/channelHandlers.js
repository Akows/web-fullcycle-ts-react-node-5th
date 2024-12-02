const db = require('../config/database');

// 모든 채널 데이터를 가져오는 함수
const getChannelsData = async (req, res) => {
    try {
        const [channels] = await db.execute('SELECT * FROM channels');
        res.status(200).json({
            message: '채널 데이터가 성공적으로 반환되었습니다.',
            channels,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 특정 채널 데이터를 가져오는 함수
const getChannelData = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [channel] = await db.execute('SELECT * FROM channels WHERE id = ?', [id]);
        if (channel.length > 0) {
            res.status(200).json({ message: '채널 데이터 반환 성공', channel: channel[0] });
        } else {
            res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 새로운 채널을 생성하는 함수
const createChannel = async (req, res) => {
    const { name, sub_num, video_count, user_id } = req.body;

    if (!name || sub_num === undefined || video_count === undefined || !user_id) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO channels (name, sub_num, video_count, user_id) VALUES (?, ?, ?, ?)',
            [name, sub_num, video_count, user_id]
        );
        res.status(201).json({ message: '채널 생성이 완료되었습니다.', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 기존 채널 데이터를 수정하는 함수
const updateChannel = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, sub_num, video_count } = req.body;

    if (!name || sub_num === undefined || video_count === undefined) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    try {
        const [existingChannel] = await db.execute('SELECT * FROM channels WHERE id = ?', [id]);
        if (existingChannel.length === 0) {
            return res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
        }

        await db.execute(
            'UPDATE channels SET name = ?, sub_num = ?, video_count = ? WHERE id = ?',
            [name, sub_num, video_count, id]
        );
        res.status(200).json({ message: '채널 정보 수정이 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// 기존 채널 데이터를 삭제하는 함수
const deleteChannel = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const [existingChannel] = await db.execute('SELECT * FROM channels WHERE id = ?', [id]);
        if (existingChannel.length === 0) {
            return res.status(404).json({ message: '채널 정보를 찾을 수 없습니다.' });
        }

        await db.execute('DELETE FROM channels WHERE id = ?', [id]);
        res.status(200).json({ message: '채널 삭제가 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = {
    getChannelsData,
    getChannelData,
    createChannel,
    updateChannel,
    deleteChannel,
};
