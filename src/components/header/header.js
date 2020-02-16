import React, {useState} from 'react';
import './header.css'
import {NavLink} from "react-router-dom";

const Header = props => {
    // const {isAuth} = props
    // const [sidebar, setSidebar] = useState(false)
    // const onToggleHamburger = () => {
    //     setSidebar(!sidebar)
    // }
    // let sideBarstyles = `${styles.sidebar}`
    // if (sidebar) {
    //     sideBarstyles += ` ${styles.sidebarOn}`
    // }
    // const sideBarUl = {display: 'none'}
    // const authUrl = isAuth
    //     ?
    //     <NavLink to={'/profile'}>
    //         <div className={styles.login}>
    //             <i className="fas fa-user"></i>
    //         </div>
    //     </NavLink>
    //
    //     : <NavLink to={'/login'}>
    //         <div className={styles.login}>
    //             <i className="fas fa-user"></i>
    //         </div>
    //     </NavLink>

    return (
        // <header>
        //     <div className={styles.wrapper}>
        //         <div className={styles.top_navbar}>
        //             <div className={styles.hamburger}
        //                  style={sidebar ? {
        //                      minWidth: '200px',
        //                      borderTopRightRadius: '20px',
        //                      borderTopLeftRadius: '20px',
        //                      borderBottomLeftRadius: '0px',
        //                      borderBottomRightRadius: '0px'
        //                  } : null}
        //                  onClick={() => onToggleHamburger()}>
        //                 <div className={styles.hamburger__container}>
        //                     <div className={styles.one}></div>
        //                     <div className={styles.two}></div>
        //                     <div className={styles.three}></div>
        //                 </div>
        //             </div>
        //
        //             <div className={styles.top_menu}>
        //                 <div className={styles.logo}>
        //                     Ranepa client
        //                 </div>
        //                 {authUrl}
        //             </div>
        //         </div>
        //
        //         <div className={sideBarstyles}>
        //             <ul style={sidebar ? null : sideBarUl}>
        //                 <li><NavLink to={'/map'} activeClassName={styles.active}>
        //                     <span className={styles.icon}><i className="fas fa-map-marked-alt"></i></span>
        //                     <span className={styles.title}>Карта</span>
        //                 </NavLink></li>
        //                 <li><NavLink to={'/timetable'} activeClassName={styles.active}>
        //                     <span className={styles.icon}><i className="fas fa-table"></i></span>
        //                     <span className={styles.title}>Расписание</span>
        //                 </NavLink></li>
        //                 <li><NavLink to={'/student-book'} activeClassName={styles.active}>
        //                     <span className={styles.icon}><i className="far fa-id-card"></i></span>
        //                     <span className={styles.title}>Зачетка</span>
        //                 </NavLink></li>
        //                 <li><NavLink to={'/references'} activeClassName={styles.active}>
        //                     <span className={styles.icon}><i className="fas fa-copy"></i></span>
        //                     <span className={styles.title}>Справки</span>
        //                 </NavLink></li>
        //                 <li><NavLink to={'/about-us'} activeClassName={styles.active}>
        //                     <span className={styles.icon}><i className="fas fa-users"></i></span>
        //                     <span className={styles.title}>О нас</span>
        //                 </NavLink></li>
        //             </ul>
        //         </div>
        //     </div>
        // </header>
        <nav className='main-menu'>
            <div className="logo">
                Н
            </div>
            {/*<div className="settings"></div>*/}
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