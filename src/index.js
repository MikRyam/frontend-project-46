import process from 'process';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from "./parsers.js";

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  // const parsedData = JSON.parse(data);
  return data;
};

const getFormat = (file) => path.extname(file);

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const parsedData1 = parse(data1, getFormat(filepath1));
  const parsedData2 = parse(data2, getFormat(filepath2));

  const keys1 = Object.keys(parsedData1);
  const keys2 = Object.keys(parsedData2);
  const sortedAllUniqKeys = _.sortBy(_.union(keys1, keys2));

  const operatorsMap = {
    unchanged: ' ',
    added: '+',
    changed: '-',
    deleted: '-',
  };
  const replacer = '  ';

  const iter = (currentValue, depth = 1) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indent = replacer.repeat(depth);
    const bracketIndent = indent.repeat((depth - 1));
    const values = currentValue.map((key) => {
      // if (data1[key] === data2[key]) {
      //   return `${indent}${operatorsMap.unchanged} ${key}: ${iter(data1[key], depth + 1)}`;
      // }
      if (!Object.hasOwn(parsedData1, key)) {
        return `${indent}${operatorsMap.added} ${key}: ${iter(parsedData2[key], depth + 1)}`;
      }
      if (!Object.hasOwn(parsedData2, key)) {
        return `${indent}${operatorsMap.deleted} ${key}: ${iter(parsedData1[key], depth + 1)}`;
      }
      if (parsedData1[key] !== parsedData2[key]) {
        return `${indent}${operatorsMap.changed} ${key}: ${iter(parsedData1[key], depth + 1)}\n${indent}${operatorsMap.added} ${key}: ${iter(parsedData2[key], depth + 1)}`;
      }
      return `${indent}${operatorsMap.unchanged} ${key}: ${iter(parsedData1[key], depth + 1)}`;
    });
    return ['{', ...values, `${bracketIndent}}`].join('\n');
  };
  return iter(sortedAllUniqKeys);
};

export default genDiff;
