import fs from 'fs';
import { fetchApiNumbers } from 'services';
import { sort } from 'utils';

const fetchAndSaveApiNumbers = async () => {
  fetchApiNumbers()
    .then(sortNumbers)
    .then(save)
    .catch((error) => console.log(error));
};

const sortNumbers = (numbers: number[]) => {
  sort(numbers);
  return Promise.resolve(numbers);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const save = (object: any) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(
      'src/database/numbers.json',
      JSON.stringify(object),
      'utf8',
      function (err) {
        if (err) {
          return reject(
            new Error('An error occured while writing JSON Object to File.')
          );
        }

        resolve();
      }
    );
  });
};

fetchAndSaveApiNumbers();
