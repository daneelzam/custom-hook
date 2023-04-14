import { useState, useEffect, useRef } from 'react';
import { fetchInfoOpenLibrary } from './utils';

/**
useOpenLibrary - custom hook for working with the Open Library API.
@param {string} query - search query.
@returns {{
  books: {key: 'string', title: 'string', author_name: string[], first_publish_year: number}[],
  isLoading: boolean,
  isError: boolean
}} - object with the following properties:
books - an array of book objects matching the query.
isLoading - book loading status.
isError - error state when loading books.
*/
export const useOpenLibrary = (query) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const timeoutRef = useRef(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(false);
  
    try {
      const result = await fetchInfoOpenLibrary(query)
      setBooks(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };
  
  useEffect(() => {
    if (!query || query.trim() === '') {
      setBooks([]);
      return;
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetchData();
      }, 500);
    }
    
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [query]);
  
  return { books, isLoading, isError };
};