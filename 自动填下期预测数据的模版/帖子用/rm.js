const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// 指定要遍历的文件夹路径
const folderPath = './';

// 指定要移除的诗句的class列表
const classesToRemove = [
'波色',
'单双',
'大小',
'大小重复3次',
'吉美凶丑',
'家野',
'合数双合数单',
'特码波色',
'吃肉菜草',
'吃肉吃菜吃草',
'男女',
'男女重复3次',
'天地重复3次',
'天地',
'琴棋书画',
'筆墨纸砚',
'春夏秋冬',
'两季',
'风雨雷电',
'吴魏蜀',
'东南西北',
'合数双合数单',
'合双合单',
'阴肖阳肖',
'合肖独肖',
'左肖右肖',
'黑肖白肖',
'前肖后肖',
'单笔双笔',
'黑中白边',
'朝肖夕肖',
'下肖上肖',
'武将文官',
'日肖夜肖',
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
'真随机1头',
'真随机2头',
'真随机3头',
'真随机4头',
'三头joindot',
'真随机1尾',
'真随机2尾',
'真随机3尾',
'真随机4尾',
'真随机5尾',
'真随机6尾',
'真随机7尾',
'真随机8尾',
'真随机9尾',
'单双4肖单肖部分',
'单双4肖双肖部分',
'单双3尾双尾部分',
'单双3尾单尾部分',
'一肖重复3次',
'一肖重复2次',
'一尾重复3次',
'一尾重复2次',
'两段24码1',
'两段24码2',
'四字成语',
'真随机1码',
'真随机2码',
'真随机5码',
'真随机6码',
'真随机7码',
'真随机8码',
'真随机10码',
'真随机16码',
'一肖带数字',
'真随机1段数',
'真随机2段数',
'真随机3段数',
'真随机4段数',
'真随机5段数',
'真随机1行',
'真随机2行',
'真随机3行',
'真随机4行',
'杀1季',
'真随机1合',
'真随机2合',
'真随机3合',
'真随机4合',
'真随机5合',
'真随机6合',
'真随机7合',
'真随机1肖带数字',
'真随机2肖带数字',
'真随机3肖带数字',
'真随机4肖带数字',
'真随机5肖带数字',
'真随机6肖带数字',
'真随机7肖带数字',
'真随机8肖带数字',
'真随机9肖带数字',
'真随机10肖带数字'
];


// 构建选择器字符串
const selector = classesToRemove.map(className => `.${className}`).join(', ');

// 递归遍历文件夹
function traverseFolder(folder) {
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

// 处理文件
function processFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('无法读取文件:', err);
            return;
        }

        // console.log(`正在处理文件: ${filePath}`);

        // 使用Cheerio加载HTML内容
        const $ = cheerio.load(data);

        // 检查是否找到要移除的class
        const elements = $(selector);
        if (elements.length === 0) {
            //console.log(`未找到指定class的元素: ${selector} in file ${filePath}`);
        } else {
            // 移除带有特定class的标签及其内容
            elements.each(function() {
              $(this).replaceWith($(this).contents());
            });

            // 获取处理后的HTML
            const result = $.html();

            // 将修改后的HTML内容保存到原文件
            fs.writeFile(filePath, result, 'utf8', err => {
                if (err) {
                    console.error('无法写入文件:', err);
                } else {
                    console.log(`文件已更新: ${filePath}`);
                }
            });
        }
    });
}

// 开始遍历文件夹
traverseFolder(folderPath);
