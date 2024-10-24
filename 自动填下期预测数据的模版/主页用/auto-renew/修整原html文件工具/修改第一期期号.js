const fs = require('fs');

// 读取 HTML 文件
fs.readFile('111.html', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }

  // 定义 ID 数组
    
    
    const idArray = [
    "cfxht1",
    "cfxht3",
    "cfxht4",
    "cfxht5",
    "cfxht6",
    "cfxht7",
    "cfxht9",
    "cfxht10",
    "cfxht11",
    "cfxht12",
    "cfxht13",
    "cfxht14",
    "cfxht15",
    "cfxht16",
    "cfxht17",
    "cfxht18",
    "cfxht19",
    "oijfq1",
    "oijfq3",
    "oijfq4",
    "oijfq5",
    "oijfq7",
    "oijfq8",
    "oijfq9",
    "oijfq10",
    "oijfq11",
    "oijfq12",
    "vmbid1",
    "vmbid2",
    "vmbid3",
    "vmbid6",
    "vmbid7",
    "vmbid8",
    "vmbid9",
    "vmbid10",
    "vmbid11",
    "vmbid12",
    "vmbid13",
    "vmbid14",
    "vmbid15",
    "vmbid16",
    "vmbid17",
    "snmse1",
    "snmse2",
    "snmse3",
    "snmse5",
    "snmse6",
    "snmse7",
    "snmse8",
    "snmse9",
    "snmse10",
    "snmse11",
    "snmse12",
    "mqhkb2",
    "mqhkb3",
    "mqhkb4",
    "mqhkb5",
    "mqhkb6",
    "mqhkb8",
    "mqhkb9",
    "mqhkb10",
    "mqhkb11",
    "mqhkb12",
    "mqhkb13",
    "mqhkb14"
]; // 替换为你的ID数组


  // 遍历每个指定的 ID
  idArray.forEach(id => {
    // 创建匹配特定 ID 的正则表达式
    const regex = new RegExp(`(<[^>]*id="${id}"[^>]*>)([\\s\\S]*?xxx期)([\\s\\S]*?<\\/[^>]+>)`, 'i');

    // 替换匹配到的第一个 "xxx期" 为 "yyy期"
    data = data.replace(regex, (match, p1, p2, p3) => {
      return p1 + p2.replace('xxx期', 'yyy期') + p3;
    });
  });

  // 将修改后的 HTML 保存到新文件
  fs.writeFile('更新期号后的文件.html', data, 'utf8', (err) => {
    if (err) {
      console.error('写入文件失败:', err);
    } else {
      console.log('文件已成功更新');
    }
  });
});
