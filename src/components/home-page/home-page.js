import React from 'react'
import styles from './home-page.module.css'

const HomePage = props => {
    return (
        <div className={styles.home_page}>
            <div className={styles.home_page__map}></div>
        </div>
    )
}

export default HomePage