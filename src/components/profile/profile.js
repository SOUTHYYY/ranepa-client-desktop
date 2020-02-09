import React, {Component} from 'react';
import styles from './profile.module.css'
import {Button} from '../UI';
import ProfileTable from './profile-table';

import {findMarkersByUser} from '../../API/firebase/firebase-api'

import logo from '../../images/profile/uventa.jpg'

class Profile extends Component {

    render() {
        const {logout} = this.props

        const handleLogout = () => {
            logout()
        }

        const {siteName, icon, userPins} = this.props
        return (
            <div className={styles.profile}>
                <div className={styles.content}>
                    <div className={styles.marks}>
                        <h1>Личный кабинет</h1>
                        <h3>Ваши отмеченные точки</h3>
                        <ProfileTable data={userPins}/>
                        <div className={styles.marks__count}>{userPins.length} точки</div>
                    </div>
                    <div className={styles.personInfo}>
                        <div className={styles.personInfo__header}>
                            <img src={icon} alt={'logo'}/>
                            <span>{siteName}</span>
                        </div>
                        <div className={styles.personInfo__settings}>
                            <Button disable>Сменить пароль</Button>
                            <Button
                                onClickFunc={() => handleLogout()}
                                disabled={false}>Выйти</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;