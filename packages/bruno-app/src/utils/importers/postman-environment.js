import each from 'lodash/each';
import fileDialog from 'file-dialog';
import { BrunoError } from 'utils/common/error';
import JSONbig from 'json-bigint';
const JSONbigAsStr = JSONbig({ useNativeBigInt: true });
const readFile = (files) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => resolve(e.target.result);
    fileReader.onerror = (err) => reject(err);
    fileReader.readAsText(files[0]);
  });
};

const isSecret = (type) => {
  return type === 'secret';
};

const importPostmanEnvironmentVariables = (brunoEnvironment, values) => {
  brunoEnvironment.variables = brunoEnvironment.variables || [];

  each(values, (i) => {
    const brunoEnvironmentVariable = {
      name: i.key,
      value: i.value,
      enabled: i.enabled,
      secret: isSecret(i.type)
    };

    brunoEnvironment.variables.push(brunoEnvironmentVariable);
  });
};

const importPostmanEnvironment = (environment) => {
  const brunoEnvironment = {
    name: environment.name,
    variables: []
  };

  importPostmanEnvironmentVariables(brunoEnvironment, environment.values);
  return brunoEnvironment;
};

const parsePostmanEnvironment = (str) => {
  return new Promise((resolve, reject) => {
    try {
      let environment = JSONbigAsStr.parse(str);
      return resolve(importPostmanEnvironment(environment));
    } catch (err) {
      console.log(err);
      if (err instanceof BrunoError) {
        return reject(err);
      }
      return reject(new BrunoError('Unable to parse the postman environment json file'));
    }
  });
};

const importEnvironment = () => {
  return new Promise((resolve, reject) => {
    fileDialog({ accept: 'application/json' })
      .then(readFile)
      .then(parsePostmanEnvironment)
      .then((environment) => resolve(environment))
      .catch((err) => {
        console.log(err);
        reject(new BrunoError('Import Environment failed'));
      });
  });
};

export default importEnvironment;
