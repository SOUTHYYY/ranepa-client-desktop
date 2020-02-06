import React, {Component} from 'react';
import not_found from '../../images/not-found/browser.svg'
import styles from './not-found.module.css'
import {NavLink} from "react-router-dom";

class NotFonud extends Component {
    render() {
        return (
            <div className={styles.not_found}>
                <img src={not_found} alt='not-found'/>
                <span>404</span>
                <NavLink to={'/map'}>
                    <button>
                        Венуться на главную
                    </button>
                </NavLink>
            </div>
        );
    }
}

export default NotFonud;