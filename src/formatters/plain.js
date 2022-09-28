import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const makePlain = (diff) => {
  const iter = (tree, parent) => tree.flatMap((node) => {
    const path = [...parent, node.key].join('.');

    switch (node.type) {
      case 'unchanged':
        return [];
      case 'added':
        return `Property '${path}' was added with value: ${getValue(node.value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
      case 'nested':
        return `${iter(node.children, [path]).join('\n')}`;
      default:
        throw new Error(`Type: ${node.state} is undefined`);
    }
  });

  const plainDiff = iter(diff, []);
  return [...plainDiff].join('\n');
};

export default makePlain;
