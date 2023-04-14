import { renderHook, waitFor, act } from '@testing-library/react';
import { useOpenLibrary } from './useOpenLibrary';
import { fetchInfoOpenLibrary } from './utils';

// Mock function fetchInfoOpenLibrary
jest.mock('./utils', () => ({
  fetchInfoOpenLibrary: jest.fn(),
}));

describe('useOpenLibrary', () => {
  beforeEach(() => {
    fetchInfoOpenLibrary.mockClear();
    jest.useFakeTimers(); // Use fake timers
  });

  afterEach(() => {
    jest.useRealTimers(); // Returning to real timers after each test
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useOpenLibrary());
    expect(result.current.books).toEqual([]);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });

  it('should fetch books and update state on query change', async () => {
    const books = [
      { key: 'key1', title: 'Title 1', author_name: ['Author name 1'], first_publish_year: 1},
      { key: 'key2', title: 'Title 2', author_name: ['Author name 2'], first_publish_year: 1},
    ];
    fetchInfoOpenLibrary.mockResolvedValue(books);

    const { result } = renderHook(() => useOpenLibrary('test'));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(fetchInfoOpenLibrary).toHaveBeenCalledTimes(1);
    expect(fetchInfoOpenLibrary).toHaveBeenCalledWith('test');
    expect(result.current.books).toEqual(books);
    expect(result.current.isError).toBeFalsy();
  });

  it('should handle fetch errors', async () => {
    fetchInfoOpenLibrary.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useOpenLibrary('test'));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(fetchInfoOpenLibrary).toHaveBeenCalledTimes(1);
    expect(fetchInfoOpenLibrary).toHaveBeenCalledWith('test');
    expect(result.current.books).toEqual([]);
    expect(result.current.isError).toBeTruthy();
  });

  it('should clear books and not fetch on empty query', async () => {
    const { result, rerender } = renderHook((query) => useOpenLibrary(query), {
      initialProps: 'test',
    });

    rerender('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(fetchInfoOpenLibrary).not.toHaveBeenCalled();
    expect(result.current.books).toEqual([]);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
  });
});
