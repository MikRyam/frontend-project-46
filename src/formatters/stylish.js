import _ from 'lodash';

const replacer = ' ';
const indent = 4;
const getIndent = (depth) => replacer.repeat(depth * indent - 2);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data) || data === null) {
    return String(data);
  }
  const entries = Object.entries(data);
  const values = entries.map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${values.join('\n')}\n${getIndent(depth - 1)}  }`;
};

const makeStylish = (diff) => {
  const iter = (data, depth) => data.map((node) => {
    switch (node.type) {
      case 'unchanged':
        return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'added':
        return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${getIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${getIndent(depth)}  }`;
      default:
        throw new Error(`${node.type} - is unknown type`);
    }
  });
  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default makeStylish;
