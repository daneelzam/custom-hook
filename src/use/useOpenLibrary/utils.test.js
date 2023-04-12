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

  it('should return an array of books when the request is valid', async () => {
    const result = await fetchInfoOpenLibrary('javascript');

    expect(result).toEqual(mockResponse.docs);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://openlibrary.org/search.json?q=javascript');
  });

  it('should throw an error when the request is invalid', async () => {
    const errorMessage = 'Network error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchInfoOpenLibrary('')).rejects.toThrowError(errorMessage);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://openlibrary.org/search.json?q=');
  });

  it('should return an empty array when the request is empty', async () => {
    const result = await fetchInfoOpenLibrary('');

    expect(result).toEqual(mockResponse.docs);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://openlibrary.org/search.json?q=');
  });
});