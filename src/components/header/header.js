import React, {useState} from 'react';
import styles from './header.module.css'
import {NavLink} from "react-router-dom";

const Header = props => {
    const {isAuth} = props
    const [sidebar, setSidebar] = useState(false)
    const onToggleHamburger = () => {
        setSidebar(!sidebar)
    }
    let sideBarstyles = `${styles.sidebar}`
    if (sidebar) {
        sideBarstyles += ` ${styles.sidebarOn}`
    }
    const sideBarUl = {display: 'none'}
    const authUrl = isAuth
        ? <NavLink to={'/profile'}>
            <i className="fas fa-user"></i>
        </NavLink>
        : <NavLink to={'/login'}>
            <i className="fas fa-user"></i>
        </NavLink>
    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.top_navbar}>
                    <div className={styles.hamburger}
                         style={sidebar ? {
                             minWidth: '200px',
                             borderTopRightRadius: '20px',
                             borderTopLeftRadius: '20px',
                             borderBottomLeftRadius: '0px',
                             borderBottomRightRadius: '0px'
                         } : null}
                         onClick={() => onToggleHamburger()}>
                        <div className={styles.hamburger__container}>
                            <div className={styles.one}></div>
                            <div className={styles.two}></div>
                            <div className={styles.three}></div>
                        </div>
                    </div>

                    <div className={styles.top_menu}>
                        <div className={styles.logo}>
                            Ranepa client
                        </div>
                        <div className={styles.login}>
                            {authUrl}
                        </div>
                    </div>
                </div>

                <div className={sideBarstyles}>
                    <ul style={sidebar ? null : sideBarUl}>
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