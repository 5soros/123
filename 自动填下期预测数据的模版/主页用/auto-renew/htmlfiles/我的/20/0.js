const { spawn } = require('child_process');


const filePaths = [
"C:\\Users\\admin\\Desktop\\down\\auto\\xin15\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\xin11\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\xin10\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\xin09\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\xin07\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\xin02\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\xin01\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\58\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\56\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\48\\3.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\48\\2.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\47\\4.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\22\\2.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\22\\1.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\20\\4.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\20\\3.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\20\\2.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\8\\5.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\8\\4.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\3\\index.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\2\\index.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\1\\index.htm",
"C:\\Users\\admin\\Desktop\\down\\auto\\48\\4.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\48\\1.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\47\\3.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\47\\1.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\23\\4.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\23\\3.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\23\\1.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\22\\4.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\20\\1.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\8\\3.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\8\\1.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\8\\2.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\58\\zhuye.html",
"C:\\Users\\admin\\Desktop\\down\\auto\\1\\zhuye.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin17\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin29\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin27\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin26\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin23\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin22\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin21\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\xin20\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\60\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\59\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\27\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\26\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\25\\index.htm",
"C:\\Users\\admin\\Desktop\\xiaoxu\\14\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\46\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\46\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\45\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\45\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\24\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\24\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\15\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\15\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\14\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\13\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\13\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\11\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\7\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\7\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\7\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\5\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\5\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\46\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\45\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\24\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\15\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\14\\3.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\13\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\11\\4.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\11\\1.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\5\\2.html",
"C:\\Users\\admin\\Desktop\\xiaoxu\\5\\1.html"
];


const program = 'C:\\Program Files (x86)\\Microsoft Office\\OFFICE11\\FRONTPG.EXE';

filePaths.forEach(filePath => {
  const child = spawn('cmd', ['/c', 'start', '', `"${program}"`, `"${filePath}"`], {
    detached: true,
    stdio: 'ignore'
  });

  // 使主进程与子进程脱离
  child.unref();
});
