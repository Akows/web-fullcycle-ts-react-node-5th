const fruits = [
    {id: 1, name: 'apple'},
    {id: 2, name: 'banana'},
    {id: 3, name: 'orange'},
    {id: 4, name: 'blueberry'},
    {id: 5, name: 'dragon fruit'},
]

const memberDatabase = new Map();
const channelDatabase = new Map();

module.exports = {
    fruits,
    memberDatabase,
    channelDatabase
};