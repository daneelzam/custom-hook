import React from 'react';
import ReactDOM from 'react-dom/client';
import { BookSearch } from './BookSearch'
const App = () => {
  return (
    <div>
        <h1>Hello, World!</h1>
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