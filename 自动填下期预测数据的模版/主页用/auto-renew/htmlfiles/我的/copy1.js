const fs = require('fs');
const path = require('path');

const SOURCE_FILE = 'D:\\A更新工程\\自动填下期预测数据的模版\\主页用\\auto-renew\\htmlfiles\\我的\\contenthtml.html';
const FOLDERS = [
    "C:\\Users\\admin\\Desktop"
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function copyFiles() {
    for (const folder of FOLDERS) {
        const destinationPath = path.join(folder, path.basename(SOURCE_FILE));
        fs.copyFileSync(SOURCE_FILE, destinationPath);
        console.log(`Copied to ${destinationPath}`);
    }
    console.log("File has been copied to all specified folders.");
    await delay(100);  // 等待3秒
}

copyFiles().catch(error => {
    console.error("An error occurred:", error);
});
