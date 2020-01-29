import React from 'react';
import './App.css';

import Header from './components/header/header';
// import HomePage from './components/home-page/home-page';
import Map from "./API/ol-maps";


function App() {
  return (
    <div>
      <Header/>
          <Map/>
    </div>
  );
}

export default App;
