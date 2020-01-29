import React from 'react';
import styles from './header.module.css'
import find from '../../images/find.svg'
import menu from '../../images/menu.svg'
import { NavLink } from 'react-router-dom'

const Header = props => {
    return (
        <header>
            <div className={styles.header__container}>
                <div>
                    <a href='/home'>
                        <h2>SOUTHYYY</h2>
                    </a>
                </div>
                <div className={styles.header__navbar}>
                    <ul>
                        <a href='/sale'>
                            <li>что-либо еще</li>
                        </a>
                        <a href='/profile'>
                            <li>Профиль</li>
                        </a>
                        <li>
                            <img src={find} alt='find'></img>
                        </li>
                        <li>
                            <img src={menu} alt='menu'></img>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}


export default Header