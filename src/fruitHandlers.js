const { fruits } = require('./data');

const getFruits = (req, res) => {
    res.send(fruits);
};

const getFruit = (req, res) => {
    const id = req.params.id;

    const result = fruits.find((fruit) => fruit.id == id);

    if (result) {
        res.json(result);
    } else {
        res.status(404).send({ error: '과일이 존재하지 않습니다.' });
    }
};

module.exports = { 
    getFruits,
    getFruit
};
