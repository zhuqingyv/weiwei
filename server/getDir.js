const fs = require('fs');
const path = require('path');
const compareFileNames = require('./sortName.js');

// 排序
const getSortValue = (key) => {
  const sortMap = {
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
    '七': 7,
    '八': 8,
    '九': 9,
  };

  const currentKey = Object.keys(sortMap).find((_key) => {
    return key.includes(_key);
  });

  // 非规范命名放在最后
  return sortMap[currentKey] || 99;
};

// function compareFileNames(a, b) {
//   try {
//     const regex = /^(\d+)/; // 匹配前方序号的正则表达式

//     const numA = parseInt(a.match(regex)[0]);
//     const numB = parseInt(b.match(regex)[0]);

//     return numA - numB;
//   } catch (error) {
//     debugger
//   }
// }

const buildNodeList = (baseUrl = '', list = []) => {
  const hasEntryHtml = (fileList = []) => {
    return fileList.find((name) => {
      return name.includes('.html');
    });
  };
  return list.reduce((nodeList, file) => {
    const filePath = path.join(baseUrl, file);
    const stats = fs.statSync(filePath);

    // 目录层级
    if (stats.isDirectory()) {
      const insetFiles = fs.readdirSync(filePath);
      const isEntryHtmlDir = hasEntryHtml(insetFiles);
      const item = {
        n: file,
        p: `${baseUrl}/${file}`,
        c: [],
        isPage: !!isEntryHtmlDir,
      };
      if (isEntryHtmlDir) item.p = `${baseUrl}/${file}/${isEntryHtmlDir}`

      nodeList.push(item);
    };

    return nodeList;
  }, []);
};

// 一级结构(一级、二级)
const mapDirectory = (baseUrl = 'pages') => {
  const files = fs.readdirSync(baseUrl);
  const filesSorted = files.sort((a, b) => {
    return getSortValue(a[0]) - getSortValue(b[0]);
  });
  // 一级目录(级别)
  const result = buildNodeList(baseUrl, filesSorted);

  result.forEach(({ p, c }) => {
    // 二级目录(课程)
    const secondFileList = fs.readdirSync(p);
    let sortSecondFileList = secondFileList.sort(compareFileNames);
    const secondNodeList = buildNodeList(p, sortSecondFileList);
    c.push(...secondNodeList);
    // 三级目录(维度)
    c.forEach(({ p, c: cc }) => {
      const thirdFileList = fs.readdirSync(p);
      const thirdNodeList = buildNodeList(p, thirdFileList);
      cc.push(...thirdNodeList);
      cc.forEach(({ p, c: children }) => {
        try {
          const thirdFileList = fs.readdirSync(p);
          const thirdNodeList = buildNodeList(p, thirdFileList);
          thirdNodeList.forEach((item) => {
            const { n } = item;
            const name = n.replace(/[0-9\s]/g, '');
            item.n = name;
          });
          children.push(...thirdNodeList)
        } catch { }
      })
    });
  });

  return result;
};
debugger;
const result = mapDirectory();
// level
const filterResult = result.filter((levelItem) => {
  const findHtml = (item) => {
    const { p, c } = item;
    const hasHtml = p.includes('.html');
    if (hasHtml) return true;
    if (c?.length) {
      return !!c.find((_) => findHtml(_))
    };
    return false;
  };

  return findHtml(levelItem);
});
debugger;
fs.writeFileSync(path.resolve(__dirname, '../src/config.json'), JSON.stringify(filterResult));