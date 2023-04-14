import React from 'react';
import ReactDOM from 'react-dom/client';
import { BookSearch } from './BookSearch'
import './style.css'

const App = () => {
  return (
    <div className='wrapper'>
        <h1 className='header'>Use our custom hook for Open Library API</h1>
        <BookSearch/>
    </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);