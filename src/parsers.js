import yaml from 'js-yaml';
import yml from "js-yaml";

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default parse;
