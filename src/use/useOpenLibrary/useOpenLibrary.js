import { useState, useEffect, useRef } from 'react';
import { fetchInfoOpenLibrary } from './utils';

/**
useOpenLibrary - кастомный хук для работы с API Open Library.
@param {string} query - поисковый запрос.
@returns {object} - объект со следующими свойствами:
books - массив объектов книг, соответствующих запросу.
isLoading - состояние загрузки книг.
isError - состояние ошибки при загрузке книг.
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
    if (query.trim() === '') {
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