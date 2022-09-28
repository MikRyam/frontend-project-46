import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const getFormattedData = (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(data);
    case 'plain':
      return makePlain(data);
    case 'json':
      return makeJson(data);
    default:
      throw new Error(`Invalid file format type: '.${format}'! Try supported file formats. Use "gendiff -h" to see all options.`);
  }
};

export default getFormattedData;
