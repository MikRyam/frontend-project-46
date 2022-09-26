import process from 'process';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTreeAST from './buildTreeAST.js';
import makeStylish from './stylish.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const rawData = fs.readFileSync(fullPath, 'utf-8');
  return rawData;
};

const getFormat = (file) => path.extname(file);

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const rawData1 = readFile(filepath1);
  const rawData2 = readFile(filepath2);

  const data1 = parse(rawData1, getFormat(filepath1));
  const data2 = parse(rawData2, getFormat(filepath2));

  const diff = buildTreeAST(data1, data2);
  const formattedTree = makeStylish(diff);
  return formattedTree;
};

export default gendiff;
