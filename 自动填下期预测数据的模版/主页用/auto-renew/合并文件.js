const fs = require('fs');
const path = require('path');

// 设置要遍历的根目录
const directoryPath = 'D:\\VScode\\Auto Result\\ce\\123\\新建文件夹\\renew'; // 修改为实际的子目录
const outputFilePath = 'D:\\VScode\\Auto Result\\ce\\123\\新建文件夹\\renew\\dsfjkhdsjf.html';

// 用于递归遍历目录的函数
function mergeHtmlFiles(directory) {
  let mergedContent = '';

  function readDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // 如果是目录，递归调用
        readDirectory(filePath);
      } else if (file.endsWith('.html') || file.endsWith('.htm')) {
        // 如果是 .html 或 .htm 文件，读取内容并追加
        const fileContent = fs.readFileSync(filePath, 'utf8');
        mergedContent += `<!-- File: ${filePath} -->\n`; // 添加注释标记文件来源
        mergedContent += fileContent + '\n\n';
      }
    });
  }

  readDirectory(directory);

  // 将合并后的内容写入输出文件
  if (mergedContent) {
    fs.writeFileSync(outputFilePath, mergedContent, 'utf8');
    console.log(`文件已合并并输出到: ${outputFilePath}`);
  } else {
    console.log('没有找到 HTML 文件');
  }
}

// 执行合并操作
mergeHtmlFiles(directoryPath);
