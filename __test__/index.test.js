import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected_file_stylish.txt');
const expectedPlain = readFile('expected_file_plain.txt');
const expectedJson = readFile('expected_file_json.txt');

const extensions = ['json', 'yml', 'yaml'];

describe('All tests', () => {
  test.each(extensions)('Format %s', (extension) => {
    const file1 = `${process.cwd()}/__fixtures__/file1.${extension}`;
    const file2 = `${process.cwd()}/__fixtures__/file2.${extension}`;

    expect(gendiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(file1, file2, 'json')).toEqual(expectedJson);
  });
});
