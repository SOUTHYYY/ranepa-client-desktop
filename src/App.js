import React from 'react';
import './App.css';

import Header from './components/header/header';
// import HomePage from './components/home-page/home-page';
import Map from "./API/ol-maps";


function App() {
  return (
    <div>
      <Header/>
        <Map apiStyle="mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf"/>
    </div>
  );
}

export default App;
