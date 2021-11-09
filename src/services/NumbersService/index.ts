import axios from 'axios';
import numbers from '../../database/numbers.json';

export const getSortedNumbers = (limit: number, page: number) => {
  let results: number[] = numbers as number[];
  const total = results.length;

  if (limit > 0) {
    const skip = (page > 0 ? page - 1 : 0) * limit;
    results = results.slice(skip, skip + limit);
  }

  return { total, results };
};

export const fetchApiNumbers = async (): Promise<number[]> => {
  return fetchAllNumbers();
};

const fetchAllNumbers = async () => {
  const allNumbers: number[] = [];
  let page = 1;
  let fetchAllPages = false;

  while (!fetchAllPages) {
    let attempts = 5;
    const fetchPage = async (): Promise<number[]> => {
      try {
        const numbers = await fetchNumbersByPage(page);
        return numbers;
      } catch (error) {
        attempts--;

        if (attempts === 0) {
          throw new Error(
            'Não foi possível fazer a busca, tente novamente mais tarde... :('
          );
        }

        console.log(
          'Houve um erro ao buscar os números. Tentando novamente...'
        );
        return await fetchPage();
      }
    };

    const newNumbers = await fetchPage();

    if (newNumbers.length === 0) {
      allNumbers.push(...newNumbers);

      console.log(`Buscando números: ${allNumbers.length}`);

      page++;
    } else {
      fetchAllPages = true;
    }
  }

  return allNumbers;
};

const fetchNumbersByPage = async (page: number) => {
  const response = await axios.get<{ numbers: number[] }>(
    `http://challenge.dienekes.com.br/api/numbers?page=${page}`
  );

  return response.data.numbers;
};
