import React from 'react';
import './App.css';
import {Switch, Route, DefaultRoute} from 'react-router-dom'

import Header from './components/header/header';
// import HomePage from './components/home-page/home-page';
import Map from "./API/ol-maps";
import NotFonud from "./components/not-found/not-fonud";
import MapContainer from "./components/container-components/map-container";


function App() {
    return (
        <div>
            <Header/>
                <Switch>
                    <Route path={'/map'}>
                        <MapContainer apiStyle="mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf"/>
                    </Route>
                    <Route path={'/timetable'}>
                        <Map apiStyle="mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf"/>
                    </Route>
                    <Route path={'/student-book'}>
                        <Map apiStyle="mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf"/>
                    </Route>
                    <Route path={'/references'}>
                        <Map apiStyle="mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf"/>
                    </Route>
                    <Route path={'/login'}>
                        <Map apiStyle="mapbox://styles/mafahes/ck5zqz49333o11intge32b2pf"/>
                    </Route>
                    <Route>
                        {/* Возвращает компонент если нету роута */}
                        <NotFonud/>
                    </Route>
                </Switch>
        </div>
    );
}

export default App;
