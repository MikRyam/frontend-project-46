import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

const cases = [
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml', 'stylish'],
  ['file1.json', 'file2.json', 'plain'],
  ['file1.yaml', 'file2.yaml', 'plain'],
  ['file1.json', 'file2.json', 'json'],
  ['file1.yaml', 'file2.yaml', 'json'],
];

describe('All tests', () => {
  test.each(cases)('Format %s', (file1, file2, format = 'stylish') => {
    const actual = gendiff(getFixturePath(file1), getFixturePath(file2), format);
    const expected = (style) => {
      switch (style) {
        case 'stylish':
          return expectedStylish;
        case 'plain':
          return expectedPlain;
        case 'json':
          return expectedJson;
        default:
          return expectedStylish;
      }
    };
    expect(actual).toEqual(expected(format));
  });
});
