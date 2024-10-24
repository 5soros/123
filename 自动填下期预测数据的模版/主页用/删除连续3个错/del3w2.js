const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
// 本文件为处理向下更新（插入为最后一个子元素）
// 配置
const contentFilePath = 'C:\\Users\\admin\\Desktop\\HK的自删除备份文件.html'; // HTML模板文件路径
const idArray = [
    "c55daxiaozt",
    "c55danshuangzt",
    "c55heibaizt",
    "c55zuoyouzt",
    "c55pingteyiwei",
    "c55qqsh",
    "c55jimeixiongchou",
    "c559xiaozt",
    "c55juesha3x",
    "c55jiayezt",
    "c557weizt",
    "c55shuangbozt",
    "c55juesha2he",
    "c55juesha10ma",
    "c55ptyixiao",
    "e21",
    "e22",
    "e25",
    "e26",
    "e27",
    "e29",
    "e210",
    "e211",
    "e212",
    "e214",
    "e215",
    "e216",
    "e217",
    "h1",
    "h4",
    "h6",
    "h7",
    "h8",
    "h9",
    "h10",
    "h12",
    "h13",
    "h14",
    "h15",
    "h16",
    "h17",
    "h18"
]; // 指定ID数组
const rootDir = './'; // 根目录

// 遍历文件夹
function processHTMLFiles(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const fullFilePath = path.join(folder, file);

        if (fs.statSync(fullFilePath).isDirectory()) {
            // 递归处理子目录
            processHTMLFiles(fullFilePath);
        } else if (fullFilePath !== contentFilePath && (file.endsWith('.html') || file.endsWith('.htm'))) {
            // 处理HTML文件
            processHTMLFile(fullFilePath);
        }
    }
}

// 处理单个HTML文件
function processHTMLFile(filePath) {
    const mainHTML = fs.readFileSync(filePath, 'utf8');
    const contentHTML = fs.readFileSync(contentFilePath, 'utf8');

    const $ = cheerio.load(mainHTML);
    const $content = cheerio.load(contentHTML);

    idArray.forEach(id => {
        // 查找页面中所有符合指定ID的元素
        const elements = $(`#${id}`);
        
        elements.each((index, element) => {
            let consecutiveErrors = 0;
            let shouldReplace = false;

            // 遍历该ID元素下的所有类名为del3w的子元素
            $(element).find('.del3w').each((i, el) => {
                const text = $(el).text();
                if (text.includes('错')) {
                    consecutiveErrors++;
                    if (consecutiveErrors > 2) {
                        shouldReplace = true;
                        return false; // 停止遍历
                    }
                } else {
                    consecutiveErrors = 0;
                }
            });

            // 如果需要替换，删除除最后一个子元素外的其他子元素
            if (shouldReplace) {
                $(element).children().slice(0,-1).remove();
                // 从模板文件中插入一个对应的子元素
                const contentElement = $content(`#${id}`);
                $(element).append(contentElement.html());
            }
        });

    });

    // 写回文件
    fs.writeFileSync(filePath, $.html());
    console.log(`HTML update successful for ${filePath}`);
}

// 开始调用函数处理
processHTMLFiles(rootDir);
