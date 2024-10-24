const fs = require('fs');

// 要复制的文件及其对应的目标文件夹
const fileMapping = [
    {
        file: 'D:\\A更新工程\\帖子备份\\55&2贴.html',
        targetDir: 'D:\\A更新工程\\自动填下期预测数据的模版\\帖子用\\55'
    },
    {
        file: 'D:\\A更新工程\\帖子备份\\香港贴.html',
        targetDir: 'D:\\A更新工程\\自动填下期预测数据的模版\\帖子用\\hk'
    },
    {
        file: 'D:\\A更新工程\\帖子备份\\小旭贴.html',
        targetDir: 'D:\\A更新工程\\自动填下期预测数据的模版\\帖子用\\xiaoxu'
    }
];

// 复制文件到指定文件夹的函数
function copyFiles(fileMapping) {
    fileMapping.forEach(mapping => {
        const srcPath = mapping.file; // 源文件路径
        const destPath = `${mapping.targetDir}\\${srcPath.split('\\').pop()}`; // 目标文件路径

        // 确保目标文件夹存在
        if (!fs.existsSync(mapping.targetDir)) {
            fs.mkdirSync(mapping.targetDir, { recursive: true });
        }

        // 复制文件
        fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
                console.error(`复制失败: ${err.message}`);
            } else {
                console.log(`成功复制 ${srcPath.split('\\').pop()} 到 ${mapping.targetDir}`);
            }
        });
    });
}

// 执行复制
copyFiles(fileMapping);