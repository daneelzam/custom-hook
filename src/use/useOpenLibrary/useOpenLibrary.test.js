import { fetchInfoOpenLibrary } from './utils';

describe('fetchInfoOpenLibrary', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = { docs: [] };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('должен возвращать массив книг, когда запрос валидный', async () => {
    const result = await fetchInfoOpenLibrary('javascript');

    expect(result).toEqual(mockResponse.docs);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://openlibrary.org/search.json?q=javascript');
  });

  it('должен выбрасывать ошибку, когда запрос невалидный', async () => {
    const errorMessage = 'Network error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchInfoOpenLibrary('')).rejects.toThrowError(errorMessage);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://openlibrary.org/search.json?q=');
  });

  it('должен возвращать пустой массив, когда запрос пустой', async () => {
    const result = await fetchInfoOpenLibrary('');

    expect(result).toEqual(mockResponse.docs);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://openlibrary.org/search.json?q=');
  });
});