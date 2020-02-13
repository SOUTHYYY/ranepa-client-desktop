import React  from 'react';
import styles from './profile.module.css'
import {Button} from '../UI';
import ProfileTable from './profile-table';


const Profile = (props) => {
    const {logout, siteName, icon } = props

    const handleLogout = () => {
        logout()
    }

    return (
        <div className={styles.profile}>
            <div className={styles.content}>
                <div className={styles.marks}>
                    <h1>Личный кабинет</h1>
                    <h3>Ваши отмеченные точки</h3>
                    <ProfileTable data={props.userPins}/>
                    <div className={styles.marks__count}>{props.userPins.length} точки</div>
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

export default Profile;