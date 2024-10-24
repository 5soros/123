const xiaoHua = require('./xiaohua.js');

function getRandoms(length) {
    return Math.floor(Math.random() * length);
}

for(let i = 0; i <100; i++){
    console.log(xiaoHua[getRandoms(xiaoHua.length)]);
}