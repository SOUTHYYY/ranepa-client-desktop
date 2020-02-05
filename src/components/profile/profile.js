import React, {Component} from 'react';
import styles from './profile.module.css'

class Profile extends Component {
    render() {
        const {logout} = this.props
        return (
            <div className={styles.profile}>
                ЛИЧНЫЙ КАБИНЕТ
                <button onClick={logout}>ВЫЙТИ</button>
            </div>
        );
    }
}

export default Profile;