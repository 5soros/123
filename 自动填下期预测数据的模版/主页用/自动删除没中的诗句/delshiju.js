const fs = require('fs'); 
const cheerio = require('cheerio');
const path = require('path'); 

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

        // 使用Cheerio加载HTML内容
        const $ = cheerio.load(data);

        // 遍历所有带有类名 "makesense" 的元素
        $('.makesense').each((i, element) => {
            // 查找是否存在带有 style="background-color: #FFFF00" 的 <span>
            const hasYellowSpan = $(element).find('span[style*="background-color: #FFFF00"]').length > 0;

            // 如果没有找到该 <span>，则删除最近的类名为 "sentence" 的父元素
            if (!hasYellowSpan) {
                const parent = $(element).closest('.sentence'); // 查找最近的类名为 "sentence" 的父元素
                if (parent.length > 0) {
                   // console.log(`删除父元素内容: ${parent.html()}`); 
                    parent.remove(); // 删除整个父元素
                }
            }
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
    });
}

// 开始遍历文件夹
const folderPath = './'; 
traverseFolder(folderPath);
