import React from 'react';
import styles from './header.module.css'
import find from '../../images/find.svg'

const Header = props => {

    // className='active' для активных айтемов
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
                        <ul>
                            <li><a href="/#">
                                <img src={find} alt={'ranepa-logo'}/>
                                <span>Найти</span>
                            </a></li>
                            <li><a href="/#">
                                Профиль
                            </a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <ul>
                        <li><a href="/#">
                            <span className={styles.icon}><i className="fas fa-table"></i></span>
                            <span className={styles.title}>Расписание</span>
                        </a></li>
                        <li><a href="/#">
                            <span className={styles.icon}><i className="far fa-id-card"></i></span>
                            <span className={styles.title}>Зачетка</span>
                        </a></li>
                        <li><a href="/#">
                            <span className={styles.icon}><i className="fas fa-copy"></i></span>
                            <span className={styles.title}>Справки</span>
                        </a></li>
                        <li><a href="/#">
                            <span className={styles.icon}><i className="fas fa-users"></i></span>
                            <span className={styles.title}>О нас</span>
                        </a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}


export default Header