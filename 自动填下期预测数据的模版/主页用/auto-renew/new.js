const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const chengYu = require('./chengyu.js');
const threeWords = require('./三字词语.js');
const shiGeA = require('./shi.js');
const xiaoHua = require('./xiaohua.js');

//固定的诗句，如解字，解诗等
const idL9 = require('./idL9.js');
const idL13 = require('./idL13.js');
const idoijfq4 = require('./idoijfq4.js');
const idsnmse13 = require('./idsnmse13.js');
const idmqhkb7 = require('./idmqhkb7.js');
const idvmbid12 = require('./idvmbid12.js');

const animalAttributes = { // 独肖合肖每年春节后修改
    '兔': ['野兽', '琴', '右肖', '黑肖', '北', '吴', '吉美', '双笔', '天肖', '黑中', '女', '筆', '红肖', '独肖', '前肖', '阳肖', '双肖', '草', '春', '朝肖', '上肖', '文官', '风', '胆小', '日肖'],
    '虎': ['野兽', '书', '右肖', '白肖', '西', '吴', '凶丑', '双笔', '地肖', '白边', '男', '纸', '蓝肖', '独肖', '前肖', '阳肖', '单肖', '肉', '春', '夕肖', '下肖', '武将', '风', '胆大', '夜肖'],
    '牛': ['家禽', '棋', '左肖', '白肖', '南', '魏', '凶丑', '双笔', '天肖', '白边', '男', '墨', '绿肖', '独肖', '前肖', '阳肖', '双肖', '草', '冬', '夕肖', '下肖', '武将', '电', '胆大', '夜肖'],
    '鼠': ['野兽', '棋', '左肖', '白肖', '东', '魏', '凶丑', '单笔', '地肖', '白边', '男', '墨', '红肖', '独肖', '前肖', '阴肖', '单肖', '菜', '冬', '夕肖', '下肖', '文官', '电', '胆小', '夜肖'],
    '猪': ['家禽', '画', '右肖', '白肖', '北', '魏', '凶丑', '单笔', '天肖', '白边', '女', '砚', '蓝肖', '合肖', '后肖', '阴肖', '双肖', '菜', '冬', '夕肖', '下肖', '文官', '电', '胆大', '夜肖'],
    '鸡': ['家禽', '琴', '左肖', '白肖', '南', '蜀', '吉美', '单笔', '地肖', '白边', '女', '筆', '红肖', '合肖', '后肖', '阳肖', '双肖', '菜', '秋', '夕肖', '上肖', '文官', '雷', '胆小', '夜肖'],
    '猴': ['野兽', '画', '左肖', '黑肖', '东', '蜀', '凶丑', '双笔', '天肖', '黑中', '男', '砚', '蓝肖', '合肖', '后肖', '阳肖', '单肖', '菜', '秋', '朝肖', '上肖', '武将', '雷', '胆大', '日肖'],
    '羊': ['家禽', '画', '右肖', '黑肖', '北', '蜀', '吉美', '双笔', '地肖', '黑中', '女', '砚', '绿肖', '独肖', '后肖', '阳肖', '双肖', '草', '夏', '朝肖', '下肖', '文官', '雨', '胆小', '日肖'],
    '马': ['家禽', '书', '右肖', '黑肖', '西', '蜀', '吉美', '单笔', '天肖', '黑中', '男', '纸', '红肖', '独肖', '后肖', '阴肖', '单肖', '草', '夏', '朝肖', '上肖', '武将', '雨', '胆大', '日肖'],
    '蛇': ['野兽', '琴', '左肖', '黑肖', '南', '吴', '吉美', '单笔', '地肖', '黑中', '女', '筆', '蓝肖', '合肖', '前肖', '阴肖', '双肖', '肉', '夏', '朝肖', '上肖', '武将', '雨', '胆小', '日肖'],
    '狗': ['家禽', '棋', '右肖', '白肖', '西', '魏', '凶丑', '双笔', '地肖', '白边', '男', '墨', '绿肖', '合肖', '后肖', '阴肖', '单肖', '肉', '秋', '夕肖', '下肖', '武将', '雷', '胆大', '夜肖'],
    '龙': ['野兽', '书', '左肖', '黑肖', '东', '吴', '吉美', '单笔', '天肖', '黑中', '男', '纸', '绿肖', '合肖', '前肖', '阴肖', '单肖', '肉', '春', '朝肖', '上肖', '文官', '风', '胆小', '日肖'],
};

const colorTable = {
    '01': '红波',
    '02': '红波',
    '03': '蓝波',
    '04': '蓝波',
    '05': '绿波',
    '06': '绿波',
    '07': '红波',
    '08': '红波',
    '09': '蓝波',
    '10': '蓝波',
    '11': '绿波',
    '12': '红波',
    '13': '红波',
    '14': '蓝波',
    '15': '蓝波',
    '16': '绿波',
    '17': '绿波',
    '18': '红波',
    '19': '红波',
    '20': '蓝波',
    '21': '绿波',
    '22': '绿波',
    '23': '红波',
    '24': '红波',
    '25': '蓝波',
    '26': '蓝波',
    '27': '绿波',
    '28': '绿波',
    '29': '红波',
    '30': '红波',
    '31': '蓝波',
    '32': '绿波',
    '33': '绿波',
    '34': '红波',
    '35': '红波',
    '36': '蓝波',
    '37': '蓝波',
    '38': '绿波',
    '39': '绿波',
    '40': '红波',
    '41': '蓝波',
    '42': '蓝波',
    '43': '绿波',
    '44': '绿波',
    '45': '红波',
    '46': '红波',
    '47': '蓝波',
    '48': '蓝波',
    '49': '绿波'
};


const animalAndNo = { // 每年春节后修改
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

const wuXingTable = { // 每年春节后修改
    '01': '火',
    '02': '金',
    '03': '金',
    '04': '土',
    '05': '土',
    '06': '木',
    '07': '木',
    '08': '火',
    '09': '火',
    '10': '金',
    '11': '金',
    '12': '水',
    '13': '水',
    '14': '木',
    '15': '木',
    '16': '火',
    '17': '火',
    '18': '土',
    '19': '土',
    '20': '水',
    '21': '水',
    '22': '木',
    '23': '木',
    '24': '金',
    '25': '金',
    '26': '土',
    '27': '土',
    '28': '水',
    '29': '水',
    '30': '火',
    '31': '火',
    '32': '金',
    '33': '金',
    '34': '土',
    '35': '土',
    '36': '木',
    '37': '木',
    '38': '火',
    '39': '火',
    '40': '金',
    '41': '金',
    '42': '水',
    '43': '水',
    '44': '木',
    '45': '木',
    '46': '火',
    '47': '火',
    '48': '土',
    '49': '土'
};

// restrictedClasses数组 为不通过 textToInsert 而自行写入文件的类名
// 一般地，这些类名通过收集类名而通过循环随机写入，不能复用 textToInsert （因为textToInsert的值是固定的）
//  本方法主要是为了应对一个栏目里需要写入多个生肖的情况，如“多组平特”
const restrictedClasses = [
    '真随机1肖',
    '真随机2肖',
    '真随机3肖',
    '真随机4肖',
    '真随机5肖',
    '真随机6肖',
    '真随机7肖',
    '真随机8肖',
    '真随机9肖',
    '真随机10肖',
    '真随机11肖',
    '随机1肖带数字'
];

// 取出1个1维数组的N个元素，参数是：一维数组名；数字（量）
function getRandomElements(arr, n) {
    // 创建一个数组副本以避免修改原数组（此为必须）
    let result = [];
    let arrCopy = [...arr];

    // 确保 n 不超过数组的长度
    if (n > arr.length) {
        throw new Error("n 不能超过数组的长度");
    }

    // 随机取出 n 个元素
    for (let i = 0; i < n; i++) {
        const randomIndex = getRandoms(arrCopy.length);
        result.push(arrCopy[randomIndex]);
        arrCopy.splice(randomIndex, 1); // 删除已选元素, 避免被再选中
    }

    return result;
}

// 生成指定范围内的1个随机整数 即包括最小,大值
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


// 随机获取index
function getRandoms(length) {
    return Math.floor(Math.random() * length);
}

// 获取对应生肖的号码，前3个肖，每个随机取2个数，后面的值取1个数
function extractValues(keys) {
    let extractedValues = [];
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let values = animalAndNo[key];
        if (values && values.length >= 2) {
            let randomIndex1 = Math.floor(Math.random() * values.length);
            let randomIndex2 = Math.floor(Math.random() * values.length);
            while (randomIndex2 === randomIndex1) {
                randomIndex2 = Math.floor(Math.random() * values.length);
            }
            if (i < 3) {
                extractedValues.push([values[randomIndex1], values[randomIndex2]]);
            } else {
                extractedValues.push([values[randomIndex1]]);
            }
        } else {
            extractedValues.push(null);
        }
    }

    return extractedValues;
}

function shuffle(str) { // Fisher-Yates Shuffle 洗牌算法，用于字符串
    const arr = [...str];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换
    }
    return arr.join('');
}

function shuffle1(array) { // Fisher-Yates Shuffle 洗牌算法，用于数组
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // 从 0 到 i 的随机索引

        // 交换元素 array[i] 和 array[j]
        // 我们使用“解构分配（destructuring assignment）”语法来实现它
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



// 删除字符串某个index的字符
function shanChu(str, index) {
    let newStr = str.slice(0, index) + str.slice(index + 1);
    return newStr;
}

// 该函数为字符串后插入 br
function insertNewlineAtPosition(str, position) {
    // 检查插入位置是否在字符串范围内
    if (position < 0 || position > str.length) {
        console.error("Position out of range");
        return str;  // 如果位置超出范围，返回原字符串
    }

    // 使用字符串切片来插入 '\n'
    let result = str.slice(0, position) + "<br>" + str.slice(position);

    return result;
}


// 读取配置文件
const configPath = path.join(__dirname, 'config.json');
let config = {};

try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    //var count = Object.keys(config).length; // 176
} catch (err) {
    console.error('读取配置文件时发生错误:', err);
    process.exit(1);
}

// 读取数据文件
const dataFilePath = path.join(__dirname, 'data.txt');
let dataLines = [];

try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    dataLines = data.trim().split('\n');
    // console.log(dataLines)
} catch (err) {
    console.error('读取数据文件时发生错误:', err);
    process.exit(1);
}

// 获取当前目录下的所有文件和子目录
const currentDirectory = __dirname;

// 递归遍历文件夹
/* function traverseFolder(folder) {
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.error('无法读取文件夹:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folder, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('无法获取文件信息:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    traverseFolder(filePath);
                } else if (filePath.endsWith('.html') || filePath.endsWith('.htm')) {
                    processFile(filePath);
                } else {
                   // console.log(`跳过文件: ${filePath}`);
                }
            });
        });
    });
}

 */
/* fs.readdir(currentDirectory, (err, files) => {
    if (err) {
        console.error('读取目录时发生错误:', err);
        return;
    }

    // 遍历每个子目录
    fs.readdir(currentDirectory, (err, files) => {
        if (err) {
            console.error('读取目录时发生错误:', err);
            return;
        }

        // 过滤出所有子目录
        const directories = files.filter(file => fs.lstatSync(path.join(currentDirectory, file)).isDirectory());
        //console.log(directories)
        // 遍历每个子目录
        directories.forEach((directory, index) => {
            console.log(`目录: ${directory}, 分配的行数据: ${dataLines[index]}`);
            const fullPath = path.join(currentDirectory, directory);

            // 检查是否有对应的行数据
            const lineData = dataLines[index];
            if (lineData) {
                const parts = lineData.trim().split(' ');
                let jiuXiao = parts[0].substring(0, 9);
                let xiaoJinZiTa9Xiao = shuffle(jiuXiao);
                let xiaoJinZiTaNo1 = extractValues(xiaoJinZiTa9Xiao);
                let xiaoJinZiTaNo = xiaoJinZiTaNo1.map(subArray => subArray.join(".")).join('.');

                // 在这里生成该子文件夹的specialNo
                let specialNo1 = extractValues(jiuXiao);
                let specialNo = specialNo1.map(subArray => subArray.join(".")).join('.');
                let banedXiao = shuffle(parts[2]);
                let _12xiao = '蛇马羊猴鸡狗猪鼠牛虎兔龙';

                // 读取目录内的所有 HTML 或 HTM 文件
                fs.readdir(fullPath, (err, innerFiles) => {
                    if (err) {
                        console.error('读取目录时发生错误:', err);
                        return;
                    }

                    innerFiles.forEach(innerFile => {
                        const filePath = path.join(fullPath, innerFile);
                        const extname = path.extname(innerFile);

                        if (fs.lstatSync(filePath).isFile() && (extname === '.html' || extname === '.htm')) {
                            // 读取并更新 HTML 文件内容
                            //使用对象传递参数，不再根据位置而是名称来使用参数
                            updateHtmlFile({
                                filePath,
                                config,
                                specialNo,
                                parts,
                                banedXiao,
                                _12xiao,
                                chengYu,
                                jiuXiao,
                                xiaoJinZiTa9Xiao,
                                xiaoJinZiTaNo
                            });
                        }
                    });
                });
            } else {
                console.log(`没有更多的行数据来更新目录 ${fullPath}`);
            }
        });
    });

});
 */


// 深度遍历目录
function traverseAndProcessDirectory(directory, dataLines, level = 0) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('读取目录时发生错误:', err);
            return;
        }

        // 过滤出所有子目录
        const directories = files.filter(file => fs.lstatSync(path.join(directory, file)).isDirectory());

        directories.forEach((subDirectory, index) => {
            const fullPath = path.join(directory, subDirectory);

            // 分配的行数据
            const lineData = dataLines[index];
            if (lineData) {
                const parts = lineData.trim().split(' ');
                let jiuXiao = parts[0].substring(0, 9);
                let xiaoJinZiTa9Xiao = shuffle(jiuXiao);
                let xiaoJinZiTaNo1 = extractValues(xiaoJinZiTa9Xiao);
                let xiaoJinZiTaNo = xiaoJinZiTaNo1.map(subArray => subArray.join(".")).join('.');

                // 生成 specialNo
                let specialNo1 = extractValues(jiuXiao);
                let specialNo = specialNo1.map(subArray => subArray.join(".")).join('.');
                let banedXiao = shuffle(parts[2]);
                let _12xiao = '蛇马羊猴鸡狗猪鼠牛虎兔龙';

                // 读取子目录内的所有 HTML 或 HTM 文件
                fs.readdir(fullPath, (err, innerFiles) => {
                    if (err) {
                        console.error('读取目录时发生错误:', err);
                        return;
                    }

                    innerFiles.forEach(innerFile => {
                        const filePath = path.join(fullPath, innerFile);
                        const extname = path.extname(innerFile);

                        if (fs.lstatSync(filePath).isFile() && (extname === '.html' || extname === '.htm')) {
                            // 使用对象传递参数
                            updateHtmlFile({
                                filePath,
                                config,
                                specialNo,
                                parts,
                                banedXiao,
                                _12xiao,
                                chengYu,
                                jiuXiao,
                                xiaoJinZiTa9Xiao,
                                xiaoJinZiTaNo
                            });
                        }
                    });
                });
            } else {
                console.log(`没有更多的行数据来更新目录 ${fullPath}`);
            }

            // 递归调用以遍历下一层级的目录
            traverseAndProcessDirectory(fullPath, dataLines, level + 1);
        });
    });
}

// 初始化遍历
traverseAndProcessDirectory(currentDirectory, dataLines);


// 更新 HTML 文件
function updateHtmlFile({ filePath, config, specialNo, parts, banedXiao, _12xiao, chengYu, jiuXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo }) {
    fs.readFile(filePath, 'utf8', (err, html) => {
        if (err) {
            console.error(`读取文件 ${filePath} 时发生错误:`, err);
            return;
        }
        const $ = cheerio.load(html);

        // const parts = lineData.trim().split(' ');
        // console.log(typeof parts);
        // console.log(Array.isArray(parts))
        for (const className in config) {
            if (config.hasOwnProperty(className)) {
                const settings = config[className];
                let textToInsert = '';
                // 第一个肖的属性
                let currentSpecialNo = specialNo;
                let animalAtts = animalAttributes[parts[0].slice(0, 1)];

                // 三个杀肖, shuffle让它每次都变化，以便截取的最后一个字每次都变化（但是还是那三个）
                banedXiao = shuffle(banedXiao);
                let di1GeShu = specialNo.slice(0, 2);
                let di1GeXiao = parts[0].slice(0, 1);
                let 头 = '01234';
                let 尾 = '0123456789';

                function banedNdigit(banedXiao, number) {
                    if (number > 15) { console.log('要杀的码太多，程序只接受最多16-17个'); return []; }
                    else {
                        let newbanedXiaos = banedXiao.split('');
                        let result = [];
                        let oneMoreXiao = animalAndNo[parts[0].slice(-1)]; // 多增加一个9肖最后的那个肖，避免有时要杀15码而导致码不够
                        for (const newbanedXiao of newbanedXiaos) {
                            result.push(animalAndNo[newbanedXiao]);
                        }
                        result = result.flat(2); //展平
                        result = [...result, ...oneMoreXiao]; // 多增加一个肖，合计最多4个杀肖
                        result = shuffle1(result.slice(0, number)); // 洗牌，按要求取数量
                        result = result.join('.');
                        return result;
                    }
                }

                // 保证 specialNo 的一致性
                // specialNo 已经生成，在此使用传入的 specialNo
                // let formattedSpecialNo = specialNo.map(subArray => subArray.join(".")).join('.');
                // specialNo = specialNo.map(subArray => subArray.join("."));
                // specialNo = specialNo.join('.');
                // console.log('是不是数组' + Array.isArray(specialNo))
                // console.dir('specialNo:' + typeof specialNo)
                // specialNo = specialNo.split(',').join('.');

                const typeHandlers = {
                    // 小金字塔（即该页面有2个金字塔，小的一般只有7肖或者5肖）
                    '小金字塔7肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),
                    '小金字塔6肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),
                    '小金字塔5肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),
                    '小金字塔4肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),
                    '小金字塔3肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),
                    '小金字塔2肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),
                    '小金字塔1肖': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTa9Xiao.substring(settings.start, settings.start + settings.length),

                    '小金字塔1码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔2码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔3码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔4码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔5码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔6码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔7码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),
                    '小金字塔8码': (settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo) => xiaoJinZiTaNo.substring(settings.start, settings.start + settings.length),



                    // 大金字塔（即该页面有2个金字塔，大的一般只有9肖或者8肖）
                    '9肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '8肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '7肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '6肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '5肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '4肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '3肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '2肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),
                    '1肖': (settings, parts) => parts[0].substring(settings.start, settings.start + settings.length),

                    '10码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '9码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '8码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '7码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '6码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '5码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '4码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '3码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '2码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),
                    '1码': (settings, parts, currentSpecialNo) => currentSpecialNo.substring(settings.start, settings.start + settings.length),


                    '杀10码': () => banedNdigit(banedXiao, 10),
                    '杀8码': () => banedNdigit(banedXiao, 8),
                    '杀7码': () => banedNdigit(banedXiao, 7),
                    '杀5码': () => banedNdigit(banedXiao, 5),
                    '平特10码': () => zeroTo49(10),
                    '平特8码': () => zeroTo49(8),
                    '平特7码': () => zeroTo49(7),
                    '平特6码': () => zeroTo49(6),
                    '平特5码': () => zeroTo49(5),

                    '家野': () => animalAtts[0],
                    '天地': () => animalAtts[8],
                    '天地重复3次': () => animalAtts[8].slice(0, 1).repeat(3),
                    '男女': () => animalAtts[10],
                    '男女重复3次': () => animalAtts[10].repeat(3),
                    '吉美凶丑': () => animalAtts[6],
                    '单双肖': () => animalAtts[16],
                    '胆大胆小': () => animalAtts[23],
                    // 添加更多类型处理
                };

                // 动态生成随机X肖处理器
                // x: 随机选择的肖数
                // 返回函数: 从parts[0]提取文本，加入banedXiao的尾部内容后进行洗牌
                // 随机N肖部分
                const generateRandomXiaoHandler = (x) => (settings, parts) => {
                    let suijiXiao = parts[0].substring(settings.start, settings.start + settings.length);
                    return shuffle(suijiXiao + shuffle(banedXiao).slice(-1));
                };


                // 添加随机N肖的处理到 typeHandlers  随机N肖部分
                for (let i = 2; i <= 9; i++) {
                    typeHandlers[`随机${i}肖`] = generateRandomXiaoHandler(i);
                }

                // 开始循环处理 typeHandlers：
                if (typeHandlers[settings.type]) {
                    textToInsert = typeHandlers[settings.type](settings, parts, currentSpecialNo, banedXiao, xiaoJinZiTa9Xiao, xiaoJinZiTaNo);
                }




                // 10码(br换行)
                if (settings.type === '10码换行' && parts[0]) {
                    let huanHang10Ma = specialNo.substring(settings.start, settings.start + settings.length);
                    // let huanHang10Ma = specialNo.slice(0, -6);
                    let huanHang10Ma1 = shanChu(huanHang10Ma, 14);
                    // let huanHang10Ma2 = insertNewlineAtPosition(huanHang10Ma1, 14);
                    const part1 = huanHang10Ma1.substring(0, 14);
                    const part2 = huanHang10Ma1.substring(14);

                    // 不再通过textToInsert，而是直接使用ID写入，将分割后的字符串插入到对应的标签中
                    $('.10码换行1').html(part1);
                    $('.10码换行2').html(part2);
                }

                // 特码大小
                if (settings.type === '特码大小' && parts[0]) {
                    if (di1GeShu > 24) {
                        textToInsert = "大";
                    }
                    else {
                        textToInsert = "小";
                    }
                }

                if (settings.type === '特码大小重复3次' && parts[0]) {
                    if (di1GeShu > 24) {
                        textToInsert = "大大大";
                    }
                    else {
                        textToInsert = "小小小";
                    }
                }




                /*
                                // 随机8肖
                                if (settings.type === '随机8肖' && parts[2]) {
                                    let suiji8xiao = parts[0].substring(settings.start, settings.start + settings.length);
                                    textToInsert = shuffle(suiji8xiao + banedXiao.slice(-1));
                                }
                
                                // 随机9肖
                                if (settings.type === '随机9肖' && parts[2]) {
                                    let suiji9xiao = parts[0].substring(settings.start, settings.start + settings.length);
                                    textToInsert = shuffle(suiji9xiao + banedXiao.slice(-1));
                                }
                */





                // 特码（肖）单双
                if (settings.type === '特码单双' && parts[0]) {
                    if (di1GeShu % 2 == 0) {
                        textToInsert = '双';
                    } else {
                        textToInsert = '单';
                    }
                }

                // 特码（肖）单双
                // if (settings.type === '特码单双单字版' && parts[0]) {
                //     if (di1GeShu % 2 == 0) {
                //         textToInsert = '双';
                //     } else {
                //         textToInsert = '单';
                //     }
                // }

                // 特码（肖）单双
                if (settings.type === '特码单双3字版' && parts[0]) {
                    if (di1GeShu % 2 == 0) {
                        textToInsert = '双双双';
                    } else {
                        textToInsert = '单单单';
                    }
                }

                if (settings.type === '4字成语') {
                    let _12xiao1 = _12xiao[getRandoms(12)]; // 随机选取一个生肖
                    // 检查 _12xiao1 是否在 chengYu 中存在
                    if (chengYu[_12xiao1]) {
                        let randomChengyu = chengYu[_12xiao1][getRandoms(chengYu[_12xiao1].length)];
                        //console.log(`随机选取的生肖是: ${_12xiao1}, 对应的成语是: ${randomChengyu}`);
                        textToInsert = randomChengyu;
                    } else {
                        console.log(`选取的生肖 ${_12xiao1} 没有对应的成语`);
                    }
                }
                if (settings.type === 'idL9') {
                    //直接插入HTML标签语句 config.json 设置 "escape": false
                    let temp = idL9[getRandoms(idL9.length)]
                    textToInsert = temp + '\n\n';
                }

                if (settings.type === 'idL13') {
                    //直接插入HTML标签语句 config.json 设置 "escape": false
                    let temp = idL13[getRandoms(idL13.length)]
                    textToInsert = temp + '\n\n';
                }

                // 香港站固定诗句
                if (settings.type === 'idvmbid12') {
                    //直接插入HTML标签语句 config.json 设置 "escape": false
                    let temp = idvmbid12[getRandoms(idvmbid12.length)]
                    textToInsert = temp + '\n';
                }
                if (settings.type === 'idmqhkb7') {
                    //直接插入HTML标签语句 config.json 设置 "escape": false
                    let temp = idmqhkb7[getRandoms(idmqhkb7.length)]
                    textToInsert = temp + '\n';
                }
                if (settings.type === 'idoijfq4') {
                    //直接插入HTML标签语句 config.json 设置 "escape": false
                    let temp = idoijfq4[getRandoms(idoijfq4.length)]
                    textToInsert = temp + '\n';
                }
                if (settings.type === 'idsnmse13') {
                    //直接插入HTML标签语句 config.json 设置 "escape": false
                    let temp = idsnmse13[getRandoms(idsnmse13.length)]
                    textToInsert = temp + '\n';
                }

                if (settings.type === '3字词语') {
                    let _12xiao1 = _12xiao[getRandoms(12)]; // 随机选取一个生肖
                    // 检查 _12xiao1 是否在 threeWords 中存在
                    if (threeWords[_12xiao1]) {
                        textToInsert = threeWords[_12xiao1][getRandoms(threeWords[_12xiao1].length)];
                    } else {
                        console.log(`选取的生肖 ${_12xiao1} 没有对应的成语`);
                    }
                }


                // N尾中特
                if (settings.type === '8尾') {
                    textToInsert = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                }

                if (settings.type === '7尾') {
                    textToInsert = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                }

                if (settings.type === '6尾') {
                    textToInsert = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                }

                if (settings.type === '5尾') {
                    textToInsert = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                }

                if (settings.type === '4尾') {
                    textToInsert = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                }
                if (settings.type === '3尾') {
                    textToInsert = shuffle(shuffle(尾).slice(0, 3));
                }
                if (settings.type === '2尾') {
                    textToInsert = shuffle(shuffle(尾).slice(0, 2));
                }


                if (settings.type === '3尾join尾杠') { // 输出：1尾-2尾-3尾
                    let temp = shuffle(shuffle(尾).slice(0, 3));
                    textToInsert = temp.slice(0, 1) + "尾-" + temp.slice(1, 2) + "尾-" + temp.slice(2, 3) + "尾";
                }

                if (settings.type === '5尾joindot') {
                    let 五尾joindot = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                    textToInsert = [...五尾joindot].join('.');
                }
                if (settings.type === '6尾joindot') {
                    let 六尾joindot = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                    textToInsert = [...六尾joindot].join('.');
                }
                if (settings.type === '7尾joindot') {
                    let 七尾joindot = shuffle(shuffle(尾).substring(settings.start, settings.start + settings.length));
                    textToInsert = [...七尾joindot].join('.');
                }


                // N头中特
                if (settings.type === '4头') {
                    textToInsert = shuffle(shuffle(头).substring(settings.start, settings.start + settings.length));
                }
                if (settings.type === '3头') {
                    textToInsert = shuffle(shuffle(头).substring(settings.start, settings.start + settings.length));
                }
                if (settings.type === '2头') {
                    textToInsert = shuffle(shuffle(头).substring(settings.start, settings.start + settings.length));
                }
                if (settings.type === '1头') {
                    textToInsert = shuffle(shuffle(头).substring(settings.start, settings.start + settings.length));
                }
                if (settings.type === '3头joindot') {
                    let 三头joindot = shuffle(shuffle(头).substring(settings.start, settings.start + settings.length));
                    textToInsert = [...三头joindot].join('.');
                }
                if (settings.type === '4头joindot') {
                    let 四头joindot = shuffle(shuffle(头).substring(settings.start, settings.start + settings.length));
                    textToInsert = [...四头joindot].join('.');
                }

                // 平特1尾
                if (settings.type === '1尾') {
                    textToInsert = shuffle(尾).slice(-1);
                }
                if (settings.type === '1尾重复2次') {
                    textToInsert = shuffle(尾).slice(-1);
                    textToInsert = textToInsert.repeat(2);
                }
                if (settings.type === '1尾重复3次') {
                    textToInsert = shuffle(尾).slice(-1);
                    textToInsert = textToInsert.repeat(3);
                }
                if (settings.type === '1尾重复4次') {
                    textToInsert = shuffle(尾).slice(-1);
                    textToInsert = textToInsert.repeat(4);
                }


                if (settings.type === '特码波色') {
                    if (di1GeShu) {
                        let 波色 = ['蓝波', '红波', '绿波'];
                        let 特码波色过滤 = 波色.filter(option => option !== colorTable[di1GeShu]);
                        textToInsert = colorTable[di1GeShu] + 特码波色过滤[getRandoms(特码波色过滤.length)];
                        textToInsert = textToInsert.match(/../gu);
                        // 用正则把textToInsert字符串每2个字为1组处理为数组以使用洗牌函数，并使用 u 修饰符处理 Unicode 字符

                        // JavaScript 的字符串是基于 UTF-16 编码的。对于大多数常见的字符（包括大部分汉字），一个字符在 UTF-16 中占用 16 位（即 2 个字节）。但是，对于一些较少见的 Unicode 字符（如表情符号、某些古代文字等），它们在 UTF-16 中是由一对 16 位代码单元（称为代理对，surrogate pair）来表示的。当你使用 u 修饰符时，正则表达式会将这些代理对作为一个完整的字符来处理。这样就可以正确匹配 Unicode 字符，而不会将代理对拆开
                        // for (let i = 1; i < 100; i++) { console.log(shuffle1(textToInsert)); }
                        textToInsert = shuffle1(textToInsert);
                        textToInsert = textToInsert.join('');
                    }
                    else {
                        console.log('找不到第一个数（特码波色）');
                    }
                }

                if (settings.type === '红蓝绿波') {
                    if (di1GeShu) {
                        let 波色1 = ['蓝', '红', '绿'];
                        let 特码波色过滤1 = 波色1.filter(option => option !== colorTable[di1GeShu].slice(0, 1));
                        textToInsert = colorTable[di1GeShu].slice(0, 1) + 特码波色过滤1[getRandoms(特码波色过滤1.length)];
                        textToInsert = shuffle(textToInsert);
                    }
                    else {
                        console.log('找不到第一个数（红蓝绿波）');
                    }
                }

                if (settings.type === '杀2尾') {
                    let 尾2 = shuffle(尾).slice(0, 2);
                    let new尾2 = '';
                    for (let i in 尾2) {
                        new尾2 += 尾2.charAt(i) + '尾';
                    }
                    textToInsert = new尾2;
                }

                if (settings.type === '杀3尾') {
                    let 尾3 = shuffle(尾).slice(0, 3);
                    let new尾3 = '';
                    for (let i in 尾3) {
                        new尾3 += 尾3.charAt(i) + '尾';
                    }
                    textToInsert = new尾3;
                }

                if (settings.type === '随机胆大胆小') { // 随机
                    let 胆大小 = ['胆大', '胆小'];
                    textToInsert = 胆大小[getRandoms(2)];
                }

                // if (settings.type === '胆大胆小') {
                //     textToInsert = animalAttributes[di1GeXiao][23];
                // }

                // 连肖

                if (settings.type === '7连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 7);
                }

                if (settings.type === '6连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 6);
                }

                if (settings.type === '5连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 5);
                }

                if (settings.type === '4连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 4);
                }

                if (settings.type === '3连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 3);
                }

                if (settings.type === '2连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 2);
                }

                if (settings.type === '3段3连肖最后一段数字') {
                    let part1 = shuffle(_12xiao).slice(0, 3);
                    let part2 = part1.slice(0, 2);
                    let part3 = part1.slice(0, 1);
                    let 最后一段数字 = part1.split('');
                    let part4 = [];
                    for (const value of 最后一段数字) {
                        part4.push(shuffle1(animalAndNo[value]).slice(0, 2));
                    }
                    part4 = part4.flat().join(".");
                    $('.3段3连肖之3肖').text(part1);
                    $('.3段3连肖之2肖').text(part2);
                    $('.3段3连肖之1肖').text(part3);
                    $('.3段3连肖数字').text(part4);
                }

                // LJ6连肖连肖，输出【猪狗】【牛马】【蛇鼠】之类

                // for (let i = 0; i < liuxiao.length; i += 2) 意味着每次循环 i 增加 2，这样可以每次取两个字符进行处理
                // substring(i, i + 2)：
                // liuxiao.substring(i, i + 2) 从 liuxiao 中截取从 i 开始的两个字符
                // 例如，如果 liuxiao = "虎兔狗蛇牛马"：
                // 当 i = 0 时，liuxiao.substring(0, 2) 返回 "虎兔"；
                // 当 i = 2 时，liuxiao.substring(2, 4) 返回 "狗蛇"；
                // 当 i = 4 时，liuxiao.substring(4, 6) 返回 "牛马"
                // 每两个字符加上 【】

                //  每次截取的两个字符会被加上 【】，然后拼接到 newliuxiao 中
                // 例如，newliuxiao 最终可能是 【虎兔】【狗蛇】【牛马】
                // 为什么用 i += 2：
                // i += 2 的目的是为了每次处理两个字符：
                // 由于 substring(i, i + 2) 每次获取两个字符，i 需要每次增加 2，跳过已经处理过的字符
                // 如果使用 i++（即每次增加 1），就会导致截取重叠的字符，不符合需求

                if (settings.type === 'LJ6连肖') {
                    let newliuxiao = '';
                    let liuxiao = shuffle(_12xiao).slice(0, 6);
                    for (let i = 0; i < liuxiao.length; i += 2) {
                        newliuxiao += `【${liuxiao.substring(i, i + 2)}】`;
                    }
                    textToInsert = newliuxiao;
                    //也可以这样写： newliuxiao = liuxiao.replace(/../gu, '【$&】');
                }

                // 3站 输出如：【狗兔猴】【马猴兔】【猪虎龙】【龙蛇猪】
                if (settings.type === 'LJ12连肖') {
                    let temp = '';
                    for (let i = 0; i < 4; i++) {
                        const selected = shuffle(_12xiao).slice(0, 3);
                        temp += `【${selected}】`;
                    }
                    textToInsert = temp;
                }



                // 连肖，输出猪狗牛马蛇鼠之类
                if (settings.type === '6连肖') {
                    textToInsert = shuffle(_12xiao).slice(0, 6);
                }

                if (settings.type === '杀3肖') {
                    textToInsert = shuffle(parts[2]);
                }

                if (settings.type === '杀2肖') {
                    textToInsert = shuffle(parts[2]).slice(-2);
                }

                if (settings.type === '杀1肖') {
                    textToInsert = shuffle(parts[2]).slice(-1);
                }
                if (settings.type === '杀1肖2') {
                    textToInsert = shuffle(parts[2]).slice(-1);
                }

                if (settings.type === '随机1头') {
                    textToInsert = shuffle(头).slice(-1);
                }
                if (settings.type === '随机1头重复3次') {
                    textToInsert = shuffle(头).slice(-1);
                    textToInsert = textToInsert.repeat(3);
                }

                // 七言诗 
                if (settings.type === '七言诗') {
                    textToInsert = shiGeA[getRandoms(shiGeA.length)];
                }
                if (settings.type === '笑话') {
                    textToInsert = xiaoHua[getRandoms(xiaoHua.length)];
                }

                if (settings.type === '六肖12码') {
                    let suiji5xiao = shuffle(parts[0]).substring(0, 5);
                    let aaa = shuffle(suiji5xiao + shuffle(banedXiao).slice(-1));
                    let animalsx = aaa.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 2);
                        resultx.push(`【${animalx}:${codes.join('.')}】`);
                    }
                    resultx = resultx.join('');
                    const part1 = resultx.substring(0, 27);
                    const part2 = resultx.substring(27);

                    // 不再通过textToInsert，而是直接使用ID写入，将分割后的字符串插入到对应的标签中
                    $('.六肖12码1').html(part1);
                    $('.六肖12码2').html(part2);
                }

                if (settings.type === '3段6肖18码') {
                    let suiji5xiao = shuffle(parts[0]).substring(0, 5);
                    let aaa = shuffle(suiji5xiao + shuffle(banedXiao).slice(-1));
                    let animalsx = aaa.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 3);
                        resultx.push(`${codes.join('.')}`);
                    }
                    resultx = resultx.join('.');
                    const part1 = animalsx.join('');
                    const part2 = resultx.substring(0, 26);
                    const part3 = resultx.substring(27,);

                    // 不再通过textToInsert，而是直接使用ID写入，将分割后的字符串插入到对应的标签中
                    $('.3段6肖18码之6肖').html(part1);
                    $('.3段6肖18码之码1').html(part2);
                    $('.3段6肖18码之码2').html(part3);
                }

                if (settings.type === '六肖18码') {// 六肖18码
                    let suiji5xiao = shuffle(parts[0]).substring(0, 5);
                    let aaa = shuffle(suiji5xiao + shuffle(banedXiao).slice(-1));
                    let animalsx = aaa.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 3);
                        resultx.push(`【${animalx}:${codes.join('.')}】`);
                    }
                    resultx = resultx.join('');

                    const part1 = resultx.substring(0, 36);
                    const part2 = resultx.substring(36);

                    // 不再通过textToInsert，而是直接使用ID写入，将分割后的字符串插入到对应的标签中
                    $('.六肖18码1').html(part1);
                    $('.六肖18码2').html(part2);
                }

                if (settings.type === '六肖18码3段') {// 六肖18码
                    let suiji5xiao = shuffle(parts[0]).substring(0, 5);
                    let aaa = shuffle(suiji5xiao + shuffle(banedXiao).slice(-1));
                    let animalsx = aaa.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 3);
                        resultx.push(`【${animalx}:${codes.join('.')}】`);
                    }
                    resultx = resultx.join('');

                    const part1 = resultx.substring(0, 24);
                    const part2 = resultx.substring(24, 48);
                    const part3 = resultx.substring(48);

                    // 不再通过textToInsert，而是直接使用ID写入，将分割后的字符串插入到对应的标签中
                    $('.六肖18码3段1').html(part1);
                    $('.六肖18码3段2').html(part2);
                    $('.六肖18码3段3').html(part3);
                }
                if (settings.type === '4平特带数字') {
                    let xiao = shuffle(_12xiao).slice(0, 4);
                    let animalsx = xiao.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(-1);
                        resultx.push(`{${animalx}:${codes.join('.')}}`);
                    }
                    textToInsert = resultx.join('');
                }
                if (settings.type === '3平特带数字') {
                    let xiao = shuffle(_12xiao).slice(0, 3);
                    let animalsx = xiao.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(-1);
                        resultx.push(`{${animalx}:${codes.join('.')}}`);
                    }
                    textToInsert = resultx.join('');
                }
                if (settings.type === '3平特带数字1') {
                    let xiao = shuffle(_12xiao).slice(0, 3);
                    let animalsx = xiao.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(-1);
                        resultx.push(`【${animalx}${codes.join('.')}】`);
                    }
                    textToInsert = resultx.join('');
                }

                if (settings.type === '3段36码') {
                    let animals = jiuXiao.split('');
                    let resultx = [];
                    for (const animal of animals) {
                        let codes = animalAndNo[animal];
                        resultx.push(`${codes.join('.')}`);
                    }
                    resultx = resultx.join('.');

                    const part1 = resultx.substring(0, 35);
                    const part2 = resultx.substring(36, 71);
                    const part3 = resultx.substring(72, 107);

                    $('.3段36码1').html(part1);
                    $('.3段36码2').html(part2);
                    $('.3段36码3').html(part3);
                }

                if (settings.type === '2段24码') {
                    let animalsx = jiuXiao.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 3);
                        resultx.push(`${codes.join('.')}`);
                    }
                    resultx = resultx.join('.');
                    const part1 = resultx.substring(0, 35);
                    const part2 = resultx.substring(36, 71);

                    $('.2段24码1').html(part1);
                    $('.2段24码2').html(part2);
                }

                if (settings.type === '降序2段24码') {
                    let animalsx = jiuXiao.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 3);
                        resultx.push(`${codes.join('.')}`);
                    }
                    resultx = resultx.join('.').split('.'); // 转数组
                    resultx = resultx.sort((a, b) => Number(b) - Number(a)); // 降序排列
                    resultx = resultx.join('.');// 转字符串

                    const part1 = resultx.substring(0, 35);
                    const part2 = resultx.substring(36, 71);

                    $('.降序2段24码1').html(part1);
                    $('.降序2段24码2').html(part2);
                }

                if (settings.type === '3段24码') {
                    let animalsx = jiuXiao.split('');
                    let resultx = [];
                    for (const animalx of animalsx) {
                        let codes = shuffle1(animalAndNo[animalx]).slice(0, 3);
                        resultx.push(`${codes.join('.')}`);
                    }
                    resultx = resultx.join('.');
                    const part1 = resultx.substring(0, 23);
                    const part2 = resultx.substring(24, 47);
                    const part3 = resultx.substring(48, 71);

                    $('.3段24码1').html(part1);
                    $('.3段24码2').html(part2);
                    $('.3段24码3').html(part3);
                }


                // 固定使用第一肖的属性

                if (settings.type === '吃肉菜草') {
                    // 也可以使用 animalAtts[17]
                    let 吃肉菜草 = animalAttributes[di1GeXiao][17];
                    let 肉菜草 = ['肉', '菜', '草'];

                    // 过滤掉当前的肖 吃肉菜草 值，然后从剩下的选项中随机选择一个
                    let remainingOptions = 肉菜草.filter(option => option !== 吃肉菜草);
                    textToInsert = 吃肉菜草 + remainingOptions[getRandoms(remainingOptions.length)];
                }

                if (settings.type === '吃肉吃菜吃草') {
                    let 吃肉菜草1 = '吃' + animalAttributes[di1GeXiao][17];
                    let 肉菜草1 = ['吃肉', '吃菜', '吃草'];

                    // 过滤掉当前的 吃肉菜草 值，然后从剩下的选项中随机选择一个
                    let remainingOptions1 = 肉菜草1.filter(option => option !== 吃肉菜草1);
                    textToInsert = 吃肉菜草1 + remainingOptions1[getRandoms(remainingOptions1.length)];
                }

                // 以下为随机选取肖的属性

                //选3
                if (settings.type === '东南西北') {
                    let 东南西北 = ['东', '南', '西', '北'];
                    textToInsert = shuffle1(东南西北).slice(0, 3).join('');
                }

                if (settings.type === '平特1肖') {
                    textToInsert = shuffle(_12xiao).slice(-1);
                }

                if (settings.type === '平特1肖重复2次') {
                    textToInsert = shuffle(_12xiao).slice(-1);
                    textToInsert = textToInsert.repeat(2);
                }

                if (settings.type === '平特1肖重复3次') {
                    textToInsert = shuffle(_12xiao).slice(-1);
                    textToInsert = textToInsert.repeat(3);
                }

                if (settings.type === '琴棋书画') {
                    let 琴棋书画 = ['琴', '棋', '书', '画'];
                    textToInsert = shuffle1(琴棋书画).slice(0, 3).join('');
                }

                if (settings.type === '筆墨纸砚') {
                    let 筆墨纸砚 = ['筆', '墨', '纸', '砚'];
                    textToInsert = shuffle1(筆墨纸砚).slice(0, 3).join('');
                }

                if (settings.type === '春夏秋冬') {
                    let 春夏秋冬 = ['春', '夏', '秋', '冬'];
                    textToInsert = shuffle1(春夏秋冬).slice(0, 3).join('');
                }

                if (settings.type === '风雨雷电') {
                    let 风雨雷电 = ['风', '雨', '雷', '电'];
                    textToInsert = shuffle1(风雨雷电).slice(0, 3).join('');
                }

                if (settings.type === '吴魏蜀') {
                    let 吴魏蜀 = ['吴', '魏', '蜀'];
                    textToInsert = shuffle1(吴魏蜀).slice(0, 2).join('');
                }

                if (settings.type === '合双合单') {
                    let 合双合单 = ['合双', '合单']
                    textToInsert = 合双合单[getRandoms(合双合单.length)];
                }

                if (settings.type === '合数双合数单') {
                    let 合数双合数单 = ['合数双', '合数单']
                    textToInsert = 合数双合数单[getRandoms(合数双合数单.length)];
                }

                if (settings.type === '阴肖阳肖') {
                    let 阴肖阳肖 = ['阴肖', '阳肖']
                    textToInsert = 阴肖阳肖[getRandoms(阴肖阳肖.length)];
                }

                if (settings.type === '合肖独肖') {
                    let 合肖独肖 = ['合肖', '独肖']
                    textToInsert = 合肖独肖[getRandoms(合肖独肖.length)];
                }

                if (settings.type === '左肖右肖') {
                    let 左肖右肖 = ['左肖', '右肖']
                    textToInsert = 左肖右肖[getRandoms(左肖右肖.length)];
                }

                if (settings.type === '黑肖白肖') {
                    let 黑肖白肖 = ['白肖', '黑肖']
                    textToInsert = 黑肖白肖[getRandoms(黑肖白肖.length)];
                }

                if (settings.type === '前肖后肖') {
                    let 前肖后肖 = ['前肖', '后肖']
                    textToInsert = 前肖后肖[getRandoms(前肖后肖.length)];
                }

                if (settings.type === '单笔双笔') {
                    let 单笔双笔 = ['单笔', '双笔']
                    textToInsert = 单笔双笔[getRandoms(单笔双笔.length)];
                }

                if (settings.type === '黑中白边') {
                    let 黑中白边 = ['黑中', '白边']
                    textToInsert = 黑中白边[getRandoms(黑中白边.length)];
                }

                if (settings.type === '朝肖夕肖') {
                    let 朝肖夕肖 = ['朝肖', '夕肖']
                    textToInsert = 朝肖夕肖[getRandoms(朝肖夕肖.length)];
                }

                if (settings.type === '下肖上肖') {
                    let 下肖上肖 = ['下肖', '上肖']
                    textToInsert = 下肖上肖[getRandoms(下肖上肖.length)];
                }

                if (settings.type === '武将文官') {
                    let 武将文官 = ['武将', '文官']
                    textToInsert = 武将文官[getRandoms(武将文官.length)];
                }

                // if (settings.type === '绝杀半波') {
                //     let 波色1 = ['蓝', '红', '绿'];
                //     let 单双 = ['单', '双'];
                //     const part2 = `${单双[getRandoms(单双.length)]}`;

                //     console.log("🚀 ~ fs.readFile ~ part1:", part1); // 正常输出
                //     console.log("🚀 ~ fs.readFile ~ part2:", part2); // 正常输出

                //     // 检查是否正确选择元素
                //     if ($('.绝杀半波之波色').length > 0 && $('.绝杀半波之单双').length > 0) {
                //         $('.绝杀半波之波色').html(part1);
                //         $('.绝杀半波之单双').html(part2);
                //     } else {
                //         console.log("选择器没有匹配到元素");
                //     }

                //     // 检查整个 HTML 结构
                //     console.log($.html());
                // }


                if (settings.type === 'shabanboBS') {
                    let 波色1 = ['蓝', '红', '绿'];
                    textToInsert = `${波色1[getRandoms(波色1.length)]}`;
                }
                // 由于cheerio对嵌套父元素的操作可能导致删除子元素，如：<span class=绝杀半波><i class=绝杀半波之波色></i><i class=绝杀半波之单双></i></span>会删除子元素, 所以为保持html结构简洁，这使用了判断对错的a.js文件的类名：shabanboDS
                if (settings.type === 'shabanboDS') {
                    let 单双 = ['单', '双'];
                    textToInsert = `${单双[getRandoms(单双.length)]}`;
                }

                if (settings.type === '杀1行') {
                    let 五行 = ['金', '木', '水', '火', '土'];
                    textToInsert = `${五行[getRandoms(五行.length)]}`
                }

                if (settings.type === '必中3行') {
                    let 数的五行 = wuXingTable[di1GeShu]
                    let 五行 = ['金', '木', '水', '火', '土'];
                    let remainingOptions = 五行.filter(option => option !== 数的五行);
                    textToInsert = 数的五行 + shuffle(remainingOptions).slice(0, 2);
                }

                if (settings.type === '必中4行') {
                    let 数的五行 = wuXingTable[di1GeShu]
                    let 五行 = ['金', '木', '水', '火', '土'];
                    let remainingOptions = 五行.filter(option => option !== 数的五行);
                    textToInsert = 数的五行 + shuffle(remainingOptions).slice(0, 3);
                }

                if (settings.type === '杀2合') {
                    let 合数 = ['01合', '02合', '03合', '04合', '05合', '06合', '07合', '08合', '09合', '10合', '11合', '12合', '13合'];
                    let firstOne = 合数[getRandoms(合数.length)];
                    let remainingOptions = 合数.filter(option => option !== firstOne);
                    textToInsert = firstOne + remainingOptions[getRandoms(remainingOptions.length)];
                    // 也可以： 1. 对数组洗牌，取出前（后）2个； 2. 
                }

                if (settings.type === '杀1合') {
                    let 合数 = ['01合', '02合', '03合', '04合', '05合', '06合', '07合', '08合', '09合', '10合', '11合', '12合', '13合'];
                    textToInsert = 合数[getRandoms(合数.length)];
                }

                if (settings.type === '红绿蓝肖') {
                    let 红绿蓝肖 = ['红肖', '绿肖', '蓝肖'];
                    textToInsert = shuffle1(红绿蓝肖).slice(0, 2).join('');
                }

                if (settings.type === '合大合小') {
                    let 合大合小 = ['合大', '合小'];
                    textToInsert = shuffle1(合大合小).slice(-1);
                }

                if (settings.type === '日肖夜肖') {
                    let 日肖夜肖 = ['日肖', '夜肖'];
                    textToInsert = shuffle1(日肖夜肖).slice(-1);
                }

                if (settings.type === '5段中特') {
                    let 段数 = [1, 2, 3, 4, 5, 6, 7];
                    textToInsert = shuffle1(段数).slice(0, 5).join('');
                }
                // 输出：虎肖-2尾
                if (settings.type === '杀1肖1尾') {
                    textToInsert = shuffle(banedXiao).slice(-1) + '肖-' + shuffle(尾).slice(-1) + '尾';
                }

                if (settings.type === '单双4肖') {
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

                    let 第一个肖是单肖 = false;
                    let 第一个肖是双肖 = false;
                    if (parseInt(animalAndNo[di1GeXiao][0]) % 2 === 0) { 第一个肖是双肖 = true };
                    if (parseInt(animalAndNo[di1GeXiao][0]) % 2 !== 0) { 第一个肖是单肖 = true };

                    if (第一个肖是双肖) {
                        let remainingOptions = 双肖.filter(option => option !== di1GeXiao);
                        let 双肖部分 = shuffle(di1GeXiao + shuffle1(remainingOptions).slice(-3).join(''));
                        let 单肖部分 = shuffle1(单肖).slice(-4).join('');
                        $('.单双4肖双肖部分').text(双肖部分);
                        $('.单双4肖单肖部分').text(单肖部分);
                    }

                    if (第一个肖是单肖) {
                        let remainingOptions = 单肖.filter(option => option !== di1GeXiao);
                        let 单肖部分 = shuffle(di1GeXiao + shuffle1(remainingOptions).slice(-3).join(''));
                        let 双肖部分 = shuffle1(双肖).slice(-4).join('');
                        $('.单双4肖单肖部分').text(单肖部分);
                        $('.单双4肖双肖部分').text(双肖部分);
                    }
                }

                if (settings.type === '黑白4肖') {
                    let 黑肖 = ['兔', '龙', '蛇', '马', '羊', '猴'];
                    let 白肖 = ['鼠', '虎', '牛', '鸡', '狗', '猪'];

                    let is黑肖 = 黑肖.includes(di1GeXiao);
                    let is白肖 = 白肖.includes(di1GeXiao);

                    if (is黑肖) {
                        let remainingOptions = 黑肖.filter(option => option !== di1GeXiao);
                        let 黑肖部分 = shuffle(di1GeXiao + shuffle1(remainingOptions).slice(-3).join(''));
                        let 白肖部分 = shuffle1(白肖).slice(-4).join('');
                        $('.黑白4肖黑肖部分').text(黑肖部分);
                        $('.黑白4肖白肖部分').text(白肖部分);
                    } else if (is白肖) {
                        let remainingOptions = 白肖.filter(option => option !== di1GeXiao);
                        let 白肖部分 = shuffle(di1GeXiao + shuffle1(remainingOptions).slice(-3).join(''));
                        let 黑肖部分 = shuffle1(黑肖).slice(-4).join('');
                        $('.黑白4肖白肖部分').text(白肖部分);
                        $('.黑白4肖黑肖部分').text(黑肖部分);
                    } else {
                        console.error("第一个肖不属于黑肖或白肖: " + 第一个肖);
                    }
                }

                // 该写法应该也用于帖子
                //也可以这样写。但是getRandomElements是处理数组的，不太合适：
                //const selected = getRandomElements(_12xiao, 3)
                // 假设需要处理 1 到 11 肖的类型

                for (let i = 1; i <= 11; i++) {
                    if (settings.type.trim() === `真随机${i}肖`) {  // 使用 trim() 清除空格
                        // console.log('Matched type:', settings.type);
                        const tags = $(`.真随机${i}肖`);
                        // console.log('Selected tags count:', tags.length);

                        tags.each((index, element) => {
                            const selected = shuffle(_12xiao).slice(0, i);
                            // console.log(`Selected characters for tag ${index}:`, selected);
                            $(element).text(selected);
                        });
                    }
                }


                if (settings.type === '单双3尾') {
                    let 单尾 = ['1', '3', '5', '7', '9'];
                    let 双尾 = ['0', '2', '4', '6', '8'];
                    let 单尾部分 = shuffle1(单尾).slice(-3).join('.');
                    let 双尾部分 = shuffle1(双尾).slice(-3).join('.');
                    $('.单双3尾单尾部分').text(单尾部分);
                    $('.单双3尾双尾部分').text(双尾部分);
                }


                if (settings.type === '随机1肖带数字') {
                    const tags = $(`.随机1肖带数字`);
                    tags.each((index, element) => {
                        let 随机1肖 = shuffle(_12xiao).slice(0, 1);
                        let 随机1肖带数字 = 随机1肖 + shuffle1(animalAndNo[随机1肖]).slice(0, 1);
                        $(element).text(随机1肖带数字);
                    });
                }


                // 扩展更多类型的处理逻辑

                // 如果需要不转义（插入 html 标签）
                if (settings.escape === false && !restrictedClasses.includes(className)) {
                    $(`.${className}`).html(textToInsert);
                } else if (!restrictedClasses.includes(className)) {
                    // 如果需要转义（保留为纯文本）
                    $(`.${className}`).text(textToInsert);
                }
            }
        }

        fs.writeFile(filePath, $.html(), 'utf8', (err) => {
            if (err) {
                console.error(`写入文件 ${filePath} 时发生错误:`, err);
                return;
            }
            // console.log(`已成功更新 ${filePath}`);
        });
    });
}