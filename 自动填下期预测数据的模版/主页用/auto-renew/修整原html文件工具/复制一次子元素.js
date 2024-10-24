const fs = require('fs');
const cheerio = require('cheerio');

// 读取HTML文件内容
fs.readFile('111.html', 'utf8', (err, data) => {
    if (err) {
        console.error('读取HTML文件出错:', err);
        return;
    }

    // 加载HTML到Cheerio
    const $ = cheerio.load(data);

    // 你指定的ID数组
    
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


    // 遍历每个指定的ID
    idArray.forEach(id => {
        const element = $(`#${id}`);

        if (element.length > 0) {
            // 获取该元素的子元素
            let children = element.children();
            // 复制子元素并插入到该元素中
            children.each(function () {
                const clonedChild = $(this).clone();
                clonedChild.appendTo(element);
    
                // 插入换行符 '\n'
                element.append('\n\n');
            });
        } else {
            console.log(`未找到ID为 ${id} 的元素`);
        }
    });

    // 将修改后的HTML保存到文件中
    fs.writeFile('output.html', $.html(), 'utf8', (err) => {
        if (err) {
            console.error('写入HTML文件出错:', err);
            return;
        }

        console.log('HTML文件已成功更新');
    });
});
