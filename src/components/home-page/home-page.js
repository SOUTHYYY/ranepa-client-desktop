import React from 'react'
import styles from './home-page.module.css'
import MapContainer from '../container-components/mapContainer';

const HomePage = props => {
    return (
        <div className={styles.home_page}>
            <div className={styles.home_page__info}>
                <h1 className={styles.home_page__header}>niu ranepa client</h1>
                <p>Новый клиент всему любимого Ранхигса от независимых разработчиков</p>
            </div>
            <div className={styles.home_page__map_wrapper}>
                <div className={styles.home_page__map}>
                    <MapContainer width='500px' height='100vh' welcomeScreen={true}/>
                </div>
            </div>

        </div>
    )
}

export default HomePage