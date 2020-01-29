import React from 'react';
import './App.css';
import Header from './components/header/header';
import HomePage from './components/home-page/home-page';

function App() {
  return (
    <div>
      <Header />
      <div className='content'>
        <HomePage />
      </div>
    </div>
  );
}

export default App;
