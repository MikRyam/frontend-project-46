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

const makeStylish = (data, depth = 0) => {
  const result = data.map((node) => {
    switch (node.type) {
      case 'unchanged':
        return `${getDepth(depth + 1)}  ${node.key}: ${getValue(node.value, depth + 2)}`;
      case 'added':
        return `${getDepth(depth + 1)}+ ${node.key}: ${getValue(node.value, depth + 2)}`;
      case 'removed':
        return `${getDepth(depth + 1)}- ${node.key}: ${getValue(node.value, depth + 2)}`;
      case 'changed':
        return `${getDepth(depth + 1)}- ${node.key}: ${getValue(node.value1, depth + 2)}\n${getDepth(depth + 1)}+ ${node.key}: ${getValue(node.value2, depth + 2)}`;
      case 'nested':
        return `${getDepth(depth + 1)}  ${node.key}: ${makeStylish(node.children, depth + 2)}`;
      default:
        throw new Error(`${node.type} - is unknown type`);
    }
  });
  return `{\n${result.join('\n')}\n${getDepth(depth)}}`;
};

export default makeStylish;
