import React from 'react'
import styles from './home-page.module.css'
import MapContainer from '../container-components/mapContainer';
import {offsets} from "../../offsets/offsets";

const HomePage = props => {
    return (
        <div className={styles.home_page}>
            <div className={styles.home_page__info}>
                <h1 className={styles.home_page__header}>{offsets.homePage.homePageHeader}</h1>
                <p>{offsets.homePage.homePageInfo}</p>
            </div>
            <div className={styles.home_page__map_wrapper}>
                <div className={styles.home_page__map}>
                    <MapContainer width='500px' height='100vh' welcomeScreen={props.welcomeScreen}/>
                </div>
            </div>

        </div>
    )
}

export default HomePage