const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
// 本文件用于移除   主页 类名
// 指定要遍历的文件夹路径
const folderPath = './';

// 指定要移除的诗句的class列表
const classesToRemove = [
'平特1肖',
'平特1肖重复2次',
'平特1肖重复3次',
'平特10码',
'平特8码',
'平特7码',
'平特6码',
'平特5码',
'3字词语',
'4字成语',
'七言诗',
'笑话',
'随机1头',
'随机1头重复3次',
'杀2尾',
'杀3尾',
'杀3肖',
'杀2肖',
'杀1肖',
'杀10码',
'杀8码',
'杀7码',
'杀5码',
'杀2合',
'杀1合',
'杀1行',
'杀1肖1尾',
'9肖',
'8肖',
'7肖',
'6肖',
'5肖',
'4肖',
'3肖',
'2肖',
'1肖',
'10码',
'9码',
'8码',
'7码',
'6码',
'5码',
'4码',
'3码',
'2码',
'1码',
'小金字塔7肖',
'小金字塔6肖',
'小金字塔5肖',
'小金字塔4肖',
'小金字塔3肖',
'小金字塔2肖',
'小金字塔1肖',
'小金字塔8码',
'小金字塔7码',
'小金字塔6码',
'小金字塔5码',
'小金字塔4码',
'小金字塔3码',
'小金字塔2码',
'小金字塔1码',
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
'随机9肖',
'随机8肖',
'随机7肖',
'随机6肖',
'随机5肖',
'随机4肖',
'随机3肖',
'随机2肖',
'8尾',
'7尾',
'6尾',
'5尾',
'4头',
'3头',
'2头',
'1尾',
'1尾重复2次',
'1尾重复3次',
'1尾重复4次',
'3头joindot',
'4头joindot',
'5尾joindot',
'6尾joindot',
'7尾joindot',
'LJ6连肖',
'LJ12连肖',
'4平特带数字',
'3平特带数字',
'3平特带数字1 ',
'3段3连肖之3肖',
'3段3连肖之2肖',
'3段3连肖之1肖',
'3段3连肖数字',
'3段6肖18码之6肖',
'3段6肖18码之码1',
'3段6肖18码之码2',
'随机1肖带数字',
'7连肖',
'6连肖',
'5连肖',
'4连肖',
'3连肖',
'2连肖',
'黑白4肖白肖部分',
'黑白4肖黑肖部分',
'单双4肖单肖部分',
'单双4肖双肖部分',
'单双3尾单尾部分',
'单双3尾双尾部分',
'六肖12码1',
'六肖12码2',
'六肖18码3段1',
'六肖18码3段2',
'六肖18码3段3',
'六肖18码1',
'六肖18码2',
'10码换行1',
'10码换行2',
'3段36码1',
'3段36码2',
'3段36码3',
'2段24码1',
'2段24码2',
'降序2段24码1',
'降序2段24码2',
'3段24码1',
'3段24码2',
'3段24码3',
'特码大小',
'特码大小重复3次',
'特码单双',
'特码单双3字版',
'单双肖',
'特码波色',
'红蓝绿波',
'红绿蓝肖',
'胆大胆小',
'随机胆大胆小',
'家野',
'吃肉菜草',
'吃肉吃菜吃草',
'男女',
'男女重复3次',
'天地重复3次',
'天地',
'琴棋书画',
'筆墨纸砚',
'春夏秋冬',
'风雨雷电',
'吴魏蜀',
'合双合单',
'东南西北',
'合数双合数单',
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
'必中3行',
'必中4行',
'吉美凶丑',
'合大合小',
'日肖夜肖',
'5段中特'
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
