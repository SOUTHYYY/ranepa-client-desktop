import React from 'react';
import './header.css'
import {NavLink} from "react-router-dom";
import {offsets} from "../../offsets/offsets";
import ranepa from '../../images/header/ranepa.png'
import Divider from "@material-ui/core/Divider";

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
                        {props.isAuth ?
                            <NavLink to={'/profile'} activeClassName="active">
                                <i className="fa fa-user-circle fa-lg"></i>
                                <span className="nav-text">{offsets.header.profile}</span>
                            </NavLink>
                            :
                            <NavLink to={'/login'} activeClassName="active">
                                <i className="fa fa-sign-in-alt fa-lg"></i>
                                <span className="nav-text">{offsets.header.login}</span>
                            </NavLink>
                        }
                    </li>
                    <li>
                        <Divider/>
                    </li>
                    <li>
                        <NavLink to={'/map'} activeClassName="active">
                            <i className="fa fa-map-marked-alt fa-lg"></i>
                            <span className="nav-text">{offsets.header.map}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/timetable'} activeClassName="active">
                            <i className="fa fa-table fa-lg"></i>
                            <span className="nav-text">{offsets.header.timetable}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/student-book'} activeClassName="active">
                            <i className="fa fa-book-open fa-lg"></i>
                            <span className="nav-text">{offsets.header.studentBook}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about-us'} activeClassName="active">
                            <i className="fa fa-info-circle fa-lg"></i>
                            <span className="nav-text">{offsets.header.aboutUs}</span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}


export default Header