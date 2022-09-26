import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff_test_json_stylish_format', () => {
  const expected = readFile('expected_file_stylish.txt');
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual).toEqual(expected);
});

test('genDiff_test_yml_default_format', () => {
  const expected = readFile('expected_file_stylish.txt');
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toEqual(expected);
});

test('genDiff_test_plain_format', () => {
  const expected = readFile('expected_file_plain.txt');
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toEqual(expected);
});

test('genDiff_test_json_format', () => {
  const expected = readFile('expected_file_json.txt');
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(actual).toEqual(expected);
});
