w/*
author: 5soros
year: 2024更新
*/
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function processFilesInDirectory(dir) {
    // 读取目录下的所有文件和子目录
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        // 忽略contenthtml.html文件
        if (filePath.endsWith('contenthtml.html')) {
            return;
        }

        if (stat.isDirectory()) {
            // 如果是子目录，则递归处理子目录
            processFilesInDirectory(filePath);
        } else if (
            path.extname(file) === '.html' ||
            path.extname(file) === '.htm'
        ) {
            // 如果是HTML文件，则读取HTML内容并修改
            const data = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(data, { decodeEntities: false });

            // 需要移除的类名数组
            const classesToRemove = [
                'del3w',
                'statementResult',
                'statement',
                'danShuangZhongTeResult',
                'danShuangZhongTe',
                'pingTeYiXiaoResult',
                'pingTeYiXiaoooo',
                'duoDuanZhongTeResult',
                'duoDuanZhongTe',
                'nTouZhongTeResult',
                'nTouZhongTe',
                'nWeiZhongTeResult',
                'nWeiZhongTe',
                'pingTeYiWeiJsResult',
                'pingTeYiWeiJs',
                'banedJueShaErHeResult',
                'banedJueShaErHe',
                'banednTouZhongTeResult',
                'banednTouZhongTe',
                'banednWeiZhongTeResult',
                'banednWeiZhongTe',
                'banedStatementResult',
                'banedStatement',
                'heDanHeShuang',
                'heDanHeShuangResult',
                'teMaBoSe',
                'teMaBoSeResult',
                'daXiaooooo',
                'daXiaoResult',
                'pingTe1966',
                'pingMa0561',
                'shiJuTe',
                'quanMa3333',
                'directResult',
                'heShuZhongTe',
                'heShuZhongTeResult',
                'wuXingZhongTe',
                'wuXingZhongTeResult',
                'shawuxing',
                'shawuxingresult',
                'banedBanDanShuang',
                'banedBanDanShuangResult',
                'banedWeiAndXiao',
                'banedWeiAndXiaoResult',
                'nTou11',
                'nWei11',
                'nTouNWeiResult',
                'heDaHeXiao',
                'heDaHeXiaoResult',
                'weiShuDaXiao',
                'weiShuDaXiaoResult',
                'banedDuoDuanZhongTe',
                'banedDuoDuanZhongTeResult',
                'banedBanDanShuangDX',
                'banedBanDanShuangDS',
                'banedBanDanShuangResult',
                'shabanboBS',
                'shabanboDS',
                'shabanboresult',
                'pingTeWithNo',
                'current9888'
            ]; // 要移除的类名

            // 选择所有标签（可以根据需求定制选择器，如 'i', 'div', 等）
            $('*').each((index, element) => {
                // 获取当前标签的类名
                let classList = $(element).attr('class');

                if (classList) {
                    // 将类名按空格拆分为数组
                    let classes = classList.split(' ');

                    // 过滤掉需要移除的类名
                    classes = classes.filter(cls => !classesToRemove.includes(cls));

                    // 更新类名
                    if (classes.length > 0) {
                        $(element).attr('class', classes.join(' '));
                    } else {
                        // 如果所有类都被移除了，则删除 class 属性
                        $(element).removeAttr('class');
                    }
                }
            });
            // 获取修改后的HTML内容
            const modifiedHTML = $.html();

            // 保存修改后的HTML内容到原文件
            fs.writeFileSync(filePath, modifiedHTML, 'utf8');

            console.log(`${filePath} update successful.`);
        }
    });
}

// 调用函数开始处理当前目录及其子目录下的文件
processFilesInDirectory('./');
