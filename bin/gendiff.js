#!/usr/bin/env node

import { Command } from 'commander';
import process from 'process'
import path from 'path';
import fs from 'fs';
import _ from "lodash";

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const parsedData = JSON.parse(data);
  return parsedData;
}

const gendiff = (path1, path2) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
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
      if (data1[key] === data2[key]) {
        return `${indent}${operatorsMap.unchanged} ${key}: ${iter(data1[key], depth + 1)}`;
      }
      else if (!Object.hasOwn(data1, key)) {
        return `${indent}${operatorsMap.added} ${key}: ${iter(data2[key], depth + 1)}`;
      }
      else if (!Object.hasOwn(data2, key)) {
        return `${indent}${operatorsMap.deleted} ${key}: ${iter(data1[key], depth + 1)}`;
      }
      else if (data1[key] !== data2[key]) {
        return `${indent}${operatorsMap.changed} ${key}: ${iter(data1[key], depth + 1)}\n${indent}${operatorsMap.added} ${key}: ${iter(data2[key], depth + 1)}`;
      }
    });
    return ['{', ...values, `${bracketIndent}}`].join('\n');
  };
  return iter(sortedAllUniqKeys);
};

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });


program.parse();