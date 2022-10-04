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

const extensions = ['json', 'yml', 'yaml'];

describe('All tests', () => {
  test.each(extensions)('Format %s', (extension) => {
    const file1 = getFixturePath(`file1.${extension}`);
    const file2 = getFixturePath(`file2.${extension}`);
   

    expect(gendiff(file1, file2)).toEqual(expectedStylish);
    expect(gendiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(file1, file2, 'json')).toEqual(expectedJson);
  });
});
