import React from 'react';
import styles from './header.module.css'
import {NavLink} from "react-router-dom";

const Header = props => {

    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.top_navbar}>
                    <div className={styles.hamburger}>
                        <div className={styles.one}></div>
                        <div className={styles.two}></div>
                        <div className={styles.three}></div>
                    </div>
                    <div className={styles.top_menu}>
                        <div className={styles.logo}>
                            Ranepa client
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <ul>
                        <li><NavLink to={'/map'} activeClassName={styles.active}>
                            <span className={styles.icon}><i className="fas fa-map-marked-alt"></i></span>
                            <span className={styles.title}>Карта</span>
                        </NavLink></li>
                        <li><NavLink to={'/timetable'} activeClassName={styles.active}>
                            <span className={styles.icon}><i className="fas fa-table"></i></span>
                            <span className={styles.title}>Расписание</span>
                        </NavLink></li>
                        <li><NavLink to={'/student-book'} activeClassName={styles.active}>
                            <span className={styles.icon}><i className="far fa-id-card"></i></span>
                            <span className={styles.title}>Зачетка</span>
                        </NavLink></li>
                        <li><NavLink to={'/references'} activeClassName={styles.active}>
                            <span className={styles.icon}><i className="fas fa-copy"></i></span>
                            <span className={styles.title}>Справки</span>
                        </NavLink></li>
                        <li><NavLink to={'/about-us'} activeClassName={styles.active}>
                            <span className={styles.icon}><i className="fas fa-users"></i></span>
                            <span className={styles.title}>О нас</span>
                        </NavLink></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}


export default Header