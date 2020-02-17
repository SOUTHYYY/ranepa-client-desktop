import React, {useState} from 'react';
import './header.css'
import {NavLink} from "react-router-dom";

import ranepa from '../../images/header/ranepa.png'

const Header = props => {
    return (
        <nav className='main-menu'>
            <div className="logo">
                <NavLink to={'/'}>
                    <img src={ranepa} alt='ranepa'/>
                </NavLink>
            </div>
            <div className="scrollbar" id="style-1">
                <ul>

                    <li>
                        <NavLink to={'/map'} activeClassName="active">
                            <i className="fa fa-home fa-lg"></i>
                            <span className="nav-text">Карта</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/timetable'} activeClassName="active">
                            <i className="fa fa-user fa-lg"></i>
                            <span className="nav-text">Расписание</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/student-book'} activeClassName="active">
                            <i className="fa fa-user fa-lg"></i>
                            <span className="nav-text">Зачетка</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/timetable'} activeClassName="active">
                            <i className="fa fa-user fa-lg"></i>
                            <span className="nav-text">О нас</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}


export default Header