const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

let combinedContent = '';  // 用于存储合并的HTML内容

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
                    traverseFolder(filePath);  // 递归遍历子文件夹
                } else if (filePath.endsWith('.html') || filePath.endsWith('.htm')) {
                    processFile(filePath);  // 处理HTML文件
                }
            });
        });
    });
}

function processFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`无法读取文件 ${filePath}:`, err);
            return;
        }

        const $ = cheerio.load(data);
        const bodyContent = $('body').html();  // 获取<body>内容

        if (bodyContent) {
            combinedContent += bodyContent + '\n';  // 追加内容并换行
        }

        writeCombinedFile();
    });
}

function writeCombinedFile() {
    const outputHtml = `<!DOCTYPE html><html><body>\n${combinedContent}\n</body></html>`;
    fs.writeFile('contenthtml.html', outputHtml, 'utf8', (err) => {
        if (err) {
            console.error('无法写入合并文件:', err);
        } else {
            console.log('合并文件成功写入到 contenthtml.html');
        }
    });
}

// 调用主函数，开始遍历
traverseFolder('./');
