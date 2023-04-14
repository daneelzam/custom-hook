import React, { useState } from 'react';
import { useOpenLibrary } from '../use/useOpenLibrary';
import './BookSearch.css';

export const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { books, isLoading, isError } = useOpenLibrary(searchQuery);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input className='search' type="text" value={searchQuery} onChange={handleChange} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {!isLoading && books && (
        <ul>
          {books && books.map((book) => (
            <li key={book.key} className='listItem'>
              {'author_name' in book && book.author_name.length && <div>Author: {book.author_name[0]}</div>}
              <div>Title: {book.title}</div>
              <div>First publish year: {book.first_publish_year}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};