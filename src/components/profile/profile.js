import React  from 'react';
import styles from './profile.module.css'
import {Button} from '../UI';
import ProfileTable from './profile-table';
import ButtonUI from '@material-ui/core/Button';


const Profile = (props) => {
    const {logout, siteName, icon } = props

    const handleLogout = () => {
        logout()
    }

    return (
        <div className={styles.profile}>
            <div className={styles.content}>
                <div className={styles.marks}>
                    <div className={styles.personInfo}>
                        <div className={styles.personInfo__header}>
                            <img src={icon} alt={'logo'}/>
                            <span>{siteName}</span>
                        </div>
                        <div className={styles.personInfo__settings}>
                            <ButtonUI variant="contained" disabled>
                                Сменить пароль
                            </ButtonUI>
                            <ButtonUI variant="contained" onClick={() => handleLogout()}>Выйти</ButtonUI>
                        </div>
                    </div>
                    <div>
                        <h1>Личный кабинет</h1>
                        <h3>Ваши отмеченные точки</h3>
                        <ProfileTable data={props.userPins}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;