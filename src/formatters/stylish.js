import _ from 'lodash';

const getDepth = (depth, indent = 4) => ' '.repeat(depth * indent - 2);

const getValue = (data, depth = 0) => {
  if (!_.isPlainObject(data) || data === null) {
    return String(data);
  }
  const entries = Object.entries(data);
  const values = entries.map(([key, value]) => `${getDepth(depth)}  ${key}: ${getValue(value, depth + 1)}`);
  return `{\n${values.join('\n')}\n${getDepth(depth - 1)}  }`;
};

const makeStylish = (diff) => {
  const iter = (data, depth) => data.map((node) => {
    switch (node.type) {
      case 'unchanged':
        return `${getDepth(depth)}  ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'added':
        return `${getDepth(depth)}+ ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'removed':
        return `${getDepth(depth)}- ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'changed':
        return `${getDepth(depth)}- ${node.key}: ${getValue(node.value1, depth + 1)}\n${getDepth(depth)}+ ${node.key}: ${getValue(node.value2, depth + 1)}`;
      case 'nested':
        return `${getDepth(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${getDepth(depth)}  }`;
      default:
        throw new Error(`${node.type} - is unknown type`);
    }
  });
  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default makeStylish;
