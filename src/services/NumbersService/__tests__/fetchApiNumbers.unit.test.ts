import axios from 'axios';
import { fetchApiNumbers } from 'services';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Function fetchApiNumbers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be possible to get all numbers', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { numbers: [1, 2, 3] } })
      .mockResolvedValueOnce({ data: { numbers: [4, 5, 6] } })
      .mockResolvedValueOnce({ data: { numbers: [] } });

    const numbers = await fetchApiNumbers();

    expect(numbers).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should be possible to get numbers even if api fails once', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { numbers: [1, 2, 3] } })
      .mockRejectedValueOnce({ data: {} })
      .mockResolvedValueOnce({ data: { numbers: [4, 5, 6] } })
      .mockResolvedValueOnce({ data: { numbers: [] } });

    const numbers = await fetchApiNumbers();

    expect(numbers).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should throw an error if api fails more than 5 times', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { numbers: [1, 2, 3] } })
      .mockRejectedValueOnce({ data: {} })
      .mockRejectedValueOnce({ data: {} })
      .mockRejectedValueOnce({ data: {} })
      .mockRejectedValueOnce({ data: {} })
      .mockRejectedValueOnce({ data: {} })
      .mockRejectedValueOnce({ data: {} });

    await expect(fetchApiNumbers()).rejects.toThrow(
      'Não foi possível fazer a busca, tente novamente mais tarde... :('
    );
  });
});
