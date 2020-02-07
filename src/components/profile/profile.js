import React, {Component} from 'react';
import styles from './profile.module.css'
import MarkerItem from "./marker-item/marker-item";
import Button from "../UI/button/button";

class Profile extends Component {
    render() {
        const {logout} = this.props
        const items = [{
            title: 'Мистер СПО',
            mainInfo: 'Сорвенование для мальчиков с СПО',
            date: '20.03.2020',
            adress: 'Ул. Пушкина 10'
        },
            {
                title: 'Мистер СПО',
                mainInfo: 'Сорвенование для мальчиков с СПО',
                date: '20.03.2020',
                adress: 'Ул. Пушкина 10'
            }].map((item, idx) => {
            return <MarkerItem  idx={idx} item={item}/>
        })

        const handleLogout = () => {
            logout()
        }

        return (
            <div className={styles.profile}>
                <div className={styles.profile__header}>
                    <h1>Личный кабинет</h1>
                    <div className={styles.header__info}>
                        <div>{this.props.login}</div>
                    </div>
                </div>
                <div className={styles.marks}>
                    <div>
                        <h3>Ваши отмеченные точки</h3>
                    </div>
                    <div className={styles.marks__count}>12 Отмеченных точек</div>
                    <table className={styles.marks__table}>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </div>
                <Button
                    text='Выйти'
                    onClickFunc={() => handleLogout()}
                    disabled={false}
                />
            </div>
        );
    }
}

export default Profile;