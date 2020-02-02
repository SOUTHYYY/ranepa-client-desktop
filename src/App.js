import React from 'react';
import './App.css';
import {Switch, Route, DefaultRoute} from 'react-router-dom'

import Header from './components/header/header';
// import HomePage from './components/home-page/home-page';
import Map from "./components/container-components/map-caller";
import NotFonud from "./components/not-found/not-fonud";




function App() {
    return (
        <div>
            <Header/>
                <Switch>
                    <Route path={'/map'}>
                        <Map/>
                    </Route>
                    <Route path={'/timetable'}>
                        <Map/>
                    </Route>
                    <Route path={'/student-book'}>
                        <Map/>
                    </Route>
                    <Route path={'/references'}>
                        <Map/>
                    </Route>
                    <Route path={'/login'}>
                        <Map/>
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
