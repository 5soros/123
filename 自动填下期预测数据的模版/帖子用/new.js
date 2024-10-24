const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const chengYu = require('./chengyu.js');


// Fisher-Yates Shuffle 洗牌算法 用于数组
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffle1(str) { // Fisher-Yates Shuffle 洗牌算法，用于字符串
    const arr = [...str];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换
    }
    return arr.join('');
}



function getRandoms(length) {
    return Math.floor(Math.random() * length);
}


// 生成指定范围内的1个随机整数 即包括最小/大值
function getRandomInRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

// 生成1-49范围内的随机整数，参数为生成的数量
function zeroTo49(number) {
    let results = new Set(); // 使用Set来存储结果，避免重复
    while (results.size < number) {
        let randomNumber = getRandomInRange(1, 49);
        let formattedNumber = randomNumber < 10 ? '0' + randomNumber : randomNumber.toString();
        results.add(formattedNumber); // 添加格式化后的数字到Set中
    }
    return Array.from(results).join('.'); // 将Set转为数组并返回

    // 或者 return [...results].join('.');
}

// 递归遍历文件夹
function traverseDirectory(dir, fileCallback) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`读取文件夹失败：${err}`);
            return;
        }
        files.forEach((file) => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`获取文件信息失败：${err}`);
                    return;
                }
                if (stats.isDirectory()) {
                    traverseDirectory(filePath, fileCallback); // 递归遍历子文件夹
                } else if (filePath.endsWith('.htm') || filePath.endsWith('.html')) {
                    fileCallback(filePath); // 处理 HTML 文件
                }
            });
        });
    });
}

// 更新 HTML 文件
function updateHtmlFile(filePath, textMapping, textMapping1) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`读取文件失败：${err}`);
            return;
        }

        const $ = cheerio.load(data);

        // 遍历 textMapping，插入纯文本，并对每个元素单独洗牌
        Object.keys(textMapping).forEach(className => {
            const textArray = textMapping[className]; // 获取用于洗牌的数组
            $(`.${className}`).each(function () {
                const randomIndex = getRandoms(textArray.length);
                $(this).html(textArray[randomIndex]); // 插入洗牌后的文本
            });
        });

        // 遍历 textMapping1，插入 HTML，并对每个元素单独洗牌
        Object.keys(textMapping1).forEach(className => {
            const htmlArray = textMapping1[className]; // 获取用于洗牌的数组
            $(`.${className}`).each(function () {
                const randomIndex = getRandoms(htmlArray.length);
                $(this).html(htmlArray[randomIndex]); // 插入洗牌后的 HTML
            });
        });

        // 写入更新后的 HTML 文件
        fs.writeFile(filePath, $.html(), (err) => {
            if (err) {
                console.error(`写入文件失败：${err}`);
            } else {
                console.log(`文件已更新：${filePath}`);
            }
        });
    });
}


/* 定义数据。本处定义数据全部转为数组，方便写入的代码处理 */

const animalAndNo = {
    '龙': ['01', '13', '25', '37', '49'],
    '兔': ['02', '14', '26', '38'],
    '虎': ['03', '15', '27', '39'],
    '牛': ['04', '16', '28', '40'],
    '鼠': ['05', '17', '29', '41'],
    '猪': ['06', '18', '30', '42'],
    '狗': ['07', '19', '31', '43'],
    '鸡': ['08', '20', '32', '44'],
    '猴': ['09', '21', '33', '45'],
    '羊': ['10', '22', '34', '46'],
    '马': ['11', '23', '35', '47'],
    '蛇': ['12', '24', '36', '48']
};


let 头 = [...'01234'];
let 尾 = [...'0123456789'];
let _12xiao = [...'蛇马羊猴鸡狗猪鼠牛虎兔龙'];
let 大小 = ['大', '小'];
let 大小重复3次 = ['大大大', '小小小'];
let 单双 = ['单', '双'];
let 家野 = ['家禽', '野兽'];
let 吉美凶丑 = ['吉美', '凶丑'];
let 合数双合数单 = ['合数双', '合数单'];
let 合双合单 = ['合双', '合单'];
let 武将文官 = ['武将', '文官'];
let 下肖上肖 = ['下肖', '上肖'];
let 朝肖夕肖 = ['朝肖', '夕肖'];
let 黑中白边 = ['黑中', '白边'];
let 单笔双笔 = ['单笔', '双笔'];
let 前肖后肖 = ['前肖', '后肖'];
let 黑肖白肖 = ['白肖', '黑肖'];
let 左肖右肖 = ['左肖', '右肖'];
let 合肖独肖 = ['合肖', '独肖'];
let 阴肖阳肖 = ['阴肖', '阳肖'];
let 日肖夜肖 = ['日肖', '夜肖'];
let 男女 = ['男', '女'];
let 男女重复3次 = ['男男男', '女女女'];
let 天地 = ['天肖', '地肖'];
let 天地重复3次 = ['天天天', '地地地'];

let 吃肉吃菜吃草 = ['吃肉', '吃菜', '吃草'];
let 肉菜草 = ['肉', '菜', '草'];
let 波色 = ['蓝波', '红波', '绿波'];
let 波 = ['蓝', '红', '绿'];
let 吴魏蜀 = ['吴', '魏', '蜀'];

let 风雨雷电 = ['风', '雨', '雷', '电'];
let 春夏秋冬 = ['春', '夏', '秋', '冬'];
let 筆墨纸砚 = ['筆', '墨', '纸', '砚'];
let 琴棋书画 = ['琴', '棋', '书', '画'];
let 东南西北 = ['东', '南', '西', '北'];
let 段数 = [...'1234567'];
let 五行 = [...'金木水火土'];
let 合数 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];


/* 数据集合 */
//处理数据，必须转化为1维数组，这些数据集合将赋值给一个变量名，用于textMapping中和class名一一对应
// 也可以先随机产生N个随机的数组，这样在如果高频率调用变量尾的时候可以降低CPU占用.再随机选一个
// let shiMaTemp = Array.from({ length: 10 }, () => shuffle(zeroTo49(49).split('.').slice(0, 10)));

// 构成每一肖带一数字的数据集合，如蛇12，狗22，蛇24等，此集合一般用于(1个)平特带数字
// let resultx = [];
// for (let i = 0; i < _12xiao.length; i++) {
//     let key = _12xiao[i];
//     let values = animalAndNo[key];

//     for (let j = 0; j < values.length; j++) {
//         resultx.push(key + values[j]);
//     }
// }
// N肖带1数字函数，参数是指多少个肖
function makeNanimalsWithNo(n) {
    let animalsx = processArray(_12xiao, n);
    let resultx = animalsx.map(subArr => {
        return subArr.map(animal => {
            let values = animalAndNo[animal];
            return animal + shuffle(values)[0];
        });
    });
    return resultx;
}

let 肖带数字results = {};
for (let i = 1; i < 13; i++) {
    肖带数字results[`真随机${i}肖带数字`] = makeNanimalsWithNo(i).map((ele) => ele.join('.'));
}
let 真随机1肖带数字 = 肖带数字results.真随机1肖带数字;
let 真随机2肖带数字 = 肖带数字results.真随机2肖带数字;
let 真随机3肖带数字 = 肖带数字results.真随机3肖带数字;
let 真随机4肖带数字 = 肖带数字results.真随机4肖带数字;
let 真随机5肖带数字 = 肖带数字results.真随机5肖带数字;
let 真随机6肖带数字 = 肖带数字results.真随机6肖带数字;
let 真随机7肖带数字 = 肖带数字results.真随机7肖带数字;
let 真随机8肖带数字 = 肖带数字results.真随机8肖带数字;
let 真随机9肖带数字 = 肖带数字results.真随机9肖带数字;
let 真随机10肖带数字 = 肖带数字results.真随机10肖带数字;



let 二十四码 = Array.from({ length: 200 }, () => shuffle(zeroTo49(49).split('.').slice(0, 24)));
let 两段24码1 = 二十四码.map((ele) => ele.slice(0, 12).join('.'));
let 两段24码2 = 二十四码.map((ele) => ele.slice(12).join('.'));


let 合数results = {};
for (let i = 1; i < 13; i++) {
    合数results[`真随机${i}合`] = processArray(合数, i).map((ele) => ele.join('.'));
}
let 真随机1合 = 合数results.真随机1合;
let 真随机2合 = 合数results.真随机2合;
let 真随机3合 = 合数results.真随机3合;
let 真随机4合 = 合数results.真随机4合;
let 真随机5合 = 合数results.真随机5合;
let 真随机6合 = 合数results.真随机6合;
let 真随机7合 = 合数results.真随机7合;


let 五行results = {};
for (let i = 1; i < 5; i++) {
    五行results[`真随机${i}行`] = processArray(五行, i).map((ele) => ele.join(''));
}
let 真随机1行 = 五行results.真随机1行;
let 真随机2行 = 五行results.真随机2行;
let 真随机3行 = 五行results.真随机3行;
let 真随机4行 = 五行results.真随机4行;


let 段数results = {};
for (let i = 1; i < 6; i++) {
    段数results[`真随机${i}段数`] = processArray(段数, i).map((ele) => ele.join(''));
}
let 真随机1段数 = 段数results.真随机1段数;
let 真随机2段数 = 段数results.真随机2段数;
let 真随机3段数 = 段数results.真随机3段数;
let 真随机4段数 = 段数results.真随机4段数;
let 真随机5段数 = 段数results.真随机5段数;

let 四十九数results = {};
for (let i = 1; i < 49; i++) {
    四十九数results[`真随机${i}码`] = processArray(zeroTo49(49).split('.'), i);
}
let 真随机1码 = 四十九数results.真随机1码;
let 真随机2码 = 四十九数results.真随机2码;
let 真随机5码 = 四十九数results.真随机5码;
let 真随机7码 = 四十九数results.真随机7码;
let 真随机6码 = 四十九数results.真随机6码;
let 真随机8码 = 四十九数results.真随机8码;
let 真随机10码 = 四十九数results.真随机10码;
let 真随机16码 = 四十九数results.真随机16码;



let _12xiao1 = _12xiao[getRandoms(12)];

let 四字成语 = shuffle(Object.values(chengYu).flat());

//map((ele) => ele.join('.'))处理数据，并转化为一维数组
// let 杀10码 = shiMaTemp.map((ele) => ele.join('.'));

// let 十尾Temp = makeNewData(尾);
// let shiWei = 十尾Temp.map((ele) => ele.join('.'));

let 十尾results = {};
for (let i = 1; i < 10; i++) {
    十尾results[`真随机${i}尾`] = processArray(尾, i).map((ele) => ele.join(''));
}
let 真随机1尾 = 十尾results.真随机1尾;
let 真随机2尾 = 十尾results.真随机2尾;
let 真随机3尾 = 十尾results.真随机3尾;
let 真随机4尾 = 十尾results.真随机4尾;
let 真随机5尾 = 十尾results.真随机5尾;
let 真随机6尾 = 十尾results.真随机6尾;
let 真随机7尾 = 十尾results.真随机7尾;
let 真随机8尾 = 十尾results.真随机8尾;
let 真随机9尾 = 十尾results.真随机9尾;

let 一尾重复3次 = 真随机1尾.map((ele) => ele.repeat(3));
let 一尾重复2次 = 真随机1尾.map((ele) => ele.repeat(2));



let 五头results = {};
for (let i = 1; i < 10; i++) {
    五头results[`真随机${i}头`] = processArray(头, i).map((ele) => ele.join(''));
}

let 真随机1头 = 五头results.真随机1头;
let 真随机2头 = 五头results.真随机2头;
let 真随机3头 = 五头results.真随机3头;
let 真随机4头 = 五头results.真随机4头;

let 头1 = processArray(头);
let 三头joindot = 头1.map((ele) => ele.join('.')); // 3个头，带 "."
三头joindot = 三头joindot.map((ele) => ele.slice(0, 5));

// let 二头 = 头1.map((ele) => ele.join('').slice(0, 2));

let 单肖 = [];
let 双肖 = [];
for (const key in animalAndNo) {
    // 遍历对象D,以在生肖数字更改时，不用维护本段代码
    const numbers = animalAndNo[key];
    const isOdd = numbers.some(num => parseInt(num) % 2 !== 0); // 判断是否包含奇数
    const isEven = numbers.some(num => parseInt(num) % 2 === 0); // 判断是否包含偶数

    if (isOdd && !isEven) {
        单肖.push(key); // 全部是奇数的分到 oddGroup
    } else if (isEven && !isOdd) {
        双肖.push(key); // 全部是偶数的分到 evenGroup
    } else {
        console.error("D对象的生肖的数有错误: " + key);
    }
}
let 单双4肖单肖部分 = processArray(单肖, 4).map((ele) => ele.join(''));;
let 单双4肖双肖部分 = processArray(双肖, 4).map((ele) => ele.join(''));;

let 单尾 = ['1', '3', '5', '7', '9'];
let 双尾 = ['2', '4', '6', '8', '0'];

let 单双3尾单尾部分 = processArray(单尾, 3).map((ele) => ele.join('.'));;
let 单双3尾双尾部分 = processArray(双尾, 3).map((ele) => ele.join('.'));;


// 也可以这样写
// let shiErXiaoTemp = makeNewData(_12xiao);
// let shiErXiao = shiErXiaoTemp.map((ele) => ele.join(''));
let results = {};

for (let i = 1; i < 12; i++) {
    results[`真随机${i}肖`] = processArray(_12xiao, i).map((ele) => ele.join(''));
}

// 通过 results 对象来访问这些结果
// console.log(results.真随机1肖);
// 依此类推，直到 results.真随机11肖
// 12值选n， 建立1-11肖的数据集
let 真随机1肖 = results.真随机1肖;
let 真随机2肖 = results.真随机2肖;
let 真随机3肖 = results.真随机3肖;
let 真随机4肖 = results.真随机4肖;
let 真随机5肖 = results.真随机5肖;
let 真随机6肖 = results.真随机6肖;
let 真随机7肖 = results.真随机7肖;
let 真随机8肖 = results.真随机8肖;
let 真随机9肖 = results.真随机9肖;
let 真随机10肖 = results.真随机10肖;
let 真随机11肖 = results.真随机11肖;

let 一肖重复3次 = results.真随机1肖.map((ele) => ele.repeat(3));
let 一肖重复2次 = results.真随机1肖.map((ele) => ele.repeat(2));


// 2值选1，processArray 建立数据集大小重复3次
let 大小1 = processArray(大小, 1);
let 大小重复3次1 = processArray(大小重复3次, 1);

let 波1 = processArray(波, 1);
let 单双1 = processArray(单双, 1);
let 日肖夜肖1 = processArray(日肖夜肖, 1);
let 家野1 = processArray(家野, 1);
let 吉美凶丑1 = processArray(吉美凶丑, 1);
let 天地1 = processArray(天地, 1);
let 天地重复3次1 = processArray(天地重复3次, 1);
let 男女1 = processArray(男女, 1);
let 男女重复3次1 = processArray(男女重复3次, 1);
let 合数双合数单1 = processArray(合数双合数单, 1);
let 合双合单1 = processArray(合双合单, 1);
let 武将文官1 = processArray(武将文官, 1);
let 下肖上肖1 = processArray(下肖上肖, 1);
let 朝肖夕肖1 = processArray(朝肖夕肖, 1);
let 黑中白边1 = processArray(黑中白边, 1);
let 单笔双笔1 = processArray(单笔双笔, 1);
let 前肖后肖1 = processArray(前肖后肖, 1);
let 黑肖白肖1 = processArray(黑肖白肖, 1);
let 左肖右肖1 = processArray(左肖右肖, 1);
let 合肖独肖1 = processArray(合肖独肖, 1);
let 阴肖阳肖1 = processArray(阴肖阳肖, 1);

// 3值选2，processArray 建立数据集
let 特码波色1 = processArray(波色, 2).map((ele) => ele.join(''));
let 肉菜草1 = processArray(肉菜草, 2).map((ele) => ele.join(''));
let 吃肉吃菜吃草1 = processArray(吃肉吃菜吃草, 2).map((ele) => ele.join(''));
let 吴魏蜀1 = processArray(吴魏蜀, 2).map((ele) => ele.join(''));

// 4值选3，processArray 建立数据集
let 风雨雷电1 = processArray(风雨雷电, 3).map((ele) => ele.join(''));
let 春夏秋冬1 = processArray(春夏秋冬, 3).map((ele) => ele.join(''));
let 春夏秋冬2 = processArray(春夏秋冬, 2).map((ele) => ele.join(''));
let 筆墨纸砚1 = processArray(筆墨纸砚, 3).map((ele) => ele.join(''));
let 琴棋书画1 = processArray(琴棋书画, 3).map((ele) => ele.join(''));
let 东南西北1 = processArray(东南西北, 3).map((ele) => ele.join(''));
let 杀1季 = processArray(春夏秋冬, 1).map((ele) => ele.join(''));

// processArray通用型函数，用于制造数据数组并选前 n 个值
function processArray(array, n) {
    let generatedData = makeNewData1(array); // 制造2维数据数组
    return generatedData.map((subArray) => subArray.slice(0, n));// 取制造的数组的子数组的前N项合并为一个新的1维数组
}

function makeNewData(str) {
    let strCopy = str;
    return Array.from({ length: 200 }, () => shuffle(strCopy.split('')));
}

function makeNewData1(array) {
    return Array.from({ length: 200 }, () => shuffle([...array]));
}


// 定义类名数据
// let 杀10码 = shiMa;
let class2 = '';

// 主函数
function main() {
    const rootDir = './';
    // textMapping 用于插入纯文本(前为html类名，后为本程序变量名)
    const textMapping = { // 使用数组
        '大小': 大小1,
        '日肖夜肖': 日肖夜肖1,
        '大小重复3次': 大小重复3次1,
        '家野': 家野1,
        '合数双合数单': 合数双合数单1,
        '特码波色': 特码波色1,
        '三头joindot': 三头joindot,
        '合双合单': 合双合单1,
        '武将文官': 武将文官1,
        '下肖上肖': 下肖上肖1,
        '朝肖夕肖': 朝肖夕肖1,
        '黑中白边': 黑中白边1,
        '单笔双笔': 单笔双笔1,
        '前肖后肖': 前肖后肖1,
        '黑肖白肖': 黑肖白肖1,
        '左肖右肖': 左肖右肖1,
        '合肖独肖': 合肖独肖1,
        '阴肖阳肖': 阴肖阳肖1,
        '东南西北': 东南西北1,
        '吴魏蜀': 吴魏蜀1,
        '风雨雷电': 风雨雷电1,
        '春夏秋冬': 春夏秋冬1,
        '两季': 春夏秋冬2,
        '筆墨纸砚': 筆墨纸砚1,
        '琴棋书画': 琴棋书画1,
        '天地': 天地1,
        '吉美凶丑': 吉美凶丑1,
        '男女': 男女1,
        '吃肉吃菜吃草': 吃肉吃菜吃草1,
        '吃肉菜草': 肉菜草1,
        '男女重复3次': 男女重复3次1,
        '天地重复3次': 天地重复3次1,
        '真随机1肖': 真随机1肖,
        '真随机2肖': 真随机2肖,
        '真随机3肖': 真随机3肖,
        '真随机4肖': 真随机4肖,
        '真随机5肖': 真随机5肖,
        '真随机6肖': 真随机6肖,
        '真随机7肖': 真随机7肖,
        '真随机8肖': 真随机8肖,
        '真随机9肖': 真随机9肖,
        '真随机10肖': 真随机10肖,
        '真随机11肖': 真随机11肖,
        '真随机1肖': 真随机1肖,
        '真随机1肖': 真随机1肖,
        '真随机1肖': 真随机1肖,
        '真随机1肖': 真随机1肖,
        '真随机1尾': 真随机1尾,
        '真随机2尾': 真随机2尾,
        '真随机3尾': 真随机3尾,
        '真随机4尾': 真随机4尾,
        '真随机5尾': 真随机5尾,
        '真随机6尾': 真随机6尾,
        '真随机7尾': 真随机7尾,
        '真随机8尾': 真随机8尾,
        '真随机9尾': 真随机9尾,
        '单双4肖单肖部分': 单双4肖单肖部分,
        '单双4肖双肖部分': 单双4肖双肖部分,
        '一肖重复3次': 一肖重复3次,
        '一肖重复2次': 一肖重复2次,
        '两段24码1': 两段24码1,
        '两段24码2': 两段24码2,
        '四字成语': 四字成语,
        '一尾重复3次': 一尾重复3次,
        '一尾重复2次': 一尾重复2次,
        '真随机1头': 真随机1头,
        '真随机2头': 真随机2头,
        '真随机3头': 真随机3头,
        '真随机4头': 真随机4头,

        '真随机1码': 真随机1码,
        '真随机2码': 真随机2码,
        '真随机5码': 真随机5码,
        '真随机6码': 真随机6码,
        '真随机7码': 真随机7码,
        '真随机8码': 真随机8码,
        '真随机10码': 真随机10码,
        '真随机16码': 真随机16码,

        '真随机1段数': 真随机1段数,
        '真随机2段数': 真随机2段数,
        '真随机3段数': 真随机3段数,
        '真随机4段数': 真随机4段数,
        '真随机5段数': 真随机5段数,

        '真随机1行': 真随机1行,
        '真随机2行': 真随机2行,
        '真随机3行': 真随机3行,
        '真随机4行': 真随机4行,

        '真随机1合': 真随机1合,
        '真随机2合': 真随机2合,
        '真随机3合': 真随机3合,
        '真随机4合': 真随机4合,
        '真随机5合': 真随机5合,
        '真随机6合': 真随机6合,
        '真随机7合': 真随机7合,
        '真随机1肖带数字': 真随机1肖带数字,
        '真随机2肖带数字': 真随机2肖带数字,
        '真随机3肖带数字': 真随机3肖带数字,
        '真随机4肖带数字': 真随机4肖带数字,
        '真随机5肖带数字': 真随机5肖带数字,
        '真随机6肖带数字': 真随机6肖带数字,
        '真随机7肖带数字': 真随机7肖带数字,
        '真随机8肖带数字': 真随机8肖带数字,
        '真随机9肖带数字': 真随机9肖带数字,

        '单双3尾单尾部分': 单双3尾单尾部分,
        '单双3尾双尾部分': 单双3尾双尾部分,
        '真随机10肖带数字': 真随机10肖带数字,
        '真随机10肖带数字': 真随机10肖带数字,
        '真随机10肖带数字': 真随机10肖带数字,
        '真随机10肖带数字': 真随机10肖带数字,
        '真随机10肖带数字': 真随机10肖带数字,
        '真随机10肖带数字': 真随机10肖带数字,

        '杀1季': 杀1季,
        '波色': 波1,
        '单双': 单双1,


    };

    // textMapping1 用于插入 HTML
    const textMapping1 = {
        'class2': class2, // 使用 HTML 数组
    };

    traverseDirectory(rootDir, (filePath) => {
        updateHtmlFile(filePath, textMapping, textMapping1);
    });
}

main();
