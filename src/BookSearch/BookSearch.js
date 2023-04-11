import React, { useState } from 'react';
import { useOpenLibrary } from '../use/useOpenLibrary';

export const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { books, isLoading, isError } = useOpenLibrary(searchQuery);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleChange} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {!isLoading && books && (
        <ul>
          {books.map((book) => (
            <li key={book.key}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};