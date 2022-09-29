import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const makePlain = (diff) => {
  const iter = (tree, parent) => {
    const result = tree.map((node) => {
      const path = [...parent, node.key].join('.');
      switch (node.type) {
        case 'unchanged':
          return null;
        case 'added':
          return `Property '${path}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
          return `${iter(node.children, [path])}`;
        default:
          throw new Error(`Type: ${node.type} is undefined`);
      }
    });
    return _.compact(result).join('\n');
  };
  return iter(diff, []);
};

export default makePlain;
