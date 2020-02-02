import React from 'react';
import './App.css';
import {Switch, Route, DefaultRoute} from 'react-router-dom'

import Header from './components/header/header';
// import HomePage from './components/home-page/home-page';
import Map from "./API/map/map-caller";
import NotFonud from "./components/not-found/not-fonud";
import MapContainer from "./components/container-components/mapContainer";



function App() {
    return (
        <div>
            <Header/>
                <Switch>
                    <Route exact path={'/map'}>
                        <MapContainer/>
                    </Route>
                    <Route path={'/timetable'}>
                        <NotFonud/>
                    </Route>
                    <Route path={'/student-book'}>
                        <MapContainer/>
                    </Route>
                    <Route path={'/references'}>
                        <MapContainer/>
                    </Route>
                    <Route path={'/login'}>
                        <MapContainer/>
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
