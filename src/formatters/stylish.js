import _ from 'lodash';

const getDepth = (depth) => ' '.repeat(depth * 2);

const getValue = (data, depth = 0) => {
  if (!_.isPlainObject(data) || data === null) {
    return String(data);
  }
  const entries = Object.entries(data);
  const items = entries.map(([key, value]) => `${getDepth(depth + 1)}  ${key}: ${getValue(value, depth + 2)}`);
  return `{\n${items.join('\n')}\n${getDepth(depth)}}`;
};

const operatorsMap = {
  unchanged: ' ',
  added: '+',
  changed: '-',
  removed: '-',
};

const makeStylish = (data, depth = 0) => {
  const result = data.map((item) => {
    const {
      key, children, value, value1, value2, type,
    } = item;
    switch (type) {
      case 'unchanged':
        return `${getDepth(depth + 1)}  ${key}: ${getValue(value, depth + 2)}`;
      case 'added':
        return `${getDepth(depth + 1)}${operatorsMap.added} ${key}: ${getValue(value, depth + 2)}`;
      case 'removed':
        return `${getDepth(depth + 1)}${operatorsMap.removed} ${key}: ${getValue(value, depth + 2)}`;
      case 'changed':
        return `${getDepth(depth + 1)}${operatorsMap.changed} ${key}: ${getValue(value1, depth + 2)}\n${getDepth(depth + 1)}${operatorsMap.added} ${key}: ${getValue(value2, depth + 2)}`;
      case 'nested':
        return `${getDepth(depth + 1)}  ${key}: ${makeStylish(children, depth + 2)}`;
      default:
        throw new Error(`${type} - is unknown type`);
    }
  });
  return `{\n${result.join('\n')}\n${getDepth(depth)}}`;
};

export default makeStylish;
