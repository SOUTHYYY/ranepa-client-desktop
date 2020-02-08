import React, {Component} from 'react';
import styles from "./profile-table.module.css";
import MarkerItem from "./marker-item/marker-item";

class ProfileTable extends Component {
    render() {
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
            return <MarkerItem idx={idx} item={item}/>
        })
        return (
            <table className={styles.marks__table}>
                <tbody>
                {items}
                </tbody>
            </table>
        );
    }
}

export default ProfileTable;