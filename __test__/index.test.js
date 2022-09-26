import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff_test_json', () => {
  const expected = readFile('expected_file.txt');
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});

test('genDiff_test_yml', () => {
  const expected = readFile('expected_file.txt');
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toBe(expected);
});
