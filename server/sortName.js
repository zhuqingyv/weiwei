function compareFileNames(a, b) {
  const regex = /第([一二三四五六七八九十]+)课/; // 匹配汉字序号的正则表达式

  const matchA = a.match(regex);
  const matchB = b.match(regex);

  if (matchA && matchB) {
    const numA = convertChineseNumberToInteger(matchA[1]);
    const numB = convertChineseNumberToInteger(matchB[1]);
    return numA - numB;
  } else if (matchA) {
    return -1; // a有序号，b没有序号，将a排在前面
  } else if (matchB) {
    return 1; // b有序号，a没有序号，将b排在前面
  } else {
    return a.localeCompare(b, 'zh');
  }
}
function convertChineseNumberToInteger(chineseNumber) {
  const numberMap = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
  };

  let result = 0;
  let temp = 0;

  for (let i = 0; i < chineseNumber.length; i++) {
    const char = chineseNumber[i];

    if (char === '十') {
      if (temp === 0) {
        temp = 10;
      } else {
        temp *= 10;
        result += temp;
        temp = 0;
      }
    } else {
      temp += numberMap[char];
    }
  }

  result += temp;

  return result;
}

module.exports = compareFileNames;