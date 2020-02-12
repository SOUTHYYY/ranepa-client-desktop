import React from 'react'
import styles from './about-us.module.css'

import map from '../../images/about-us/map-on-cellphone-screen.svg'

const AboutUs = () => {
    return (
        <div className={styles.aboutUs}>
            <div className={styles.aboutUs__header}>
                Немного информации о нашем сервисе
            </div>
            <div className={styles.aboutUs__info}>
                <div>Создание мероприятий НИУ РАНХиГС больше не создает трудности в оповещении и привлечении
                    аудитории!
                </div>
                <div className={styles.aboutUs__mainInfo}>
                    <div className={styles.aboutUs__mapIcon}>
                        <img src={map} alt={'map'}/>
                    </div>
                    <div className={styles.aboutUs__benefits}>
                        <h4>Преимущества нашего клиента</h4>
                        <ul>
                            <li>Вы всегда в курсе новых ивентов НИУ РАНХиГС, знаете точный адрес и время проведения</li>
                            <li>Обновленный дизайн распиания</li>
                            <li>Возможность заказать справку не заходя в деканат!</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.aboutUs__links}>
                <h3>Над проектом работали:</h3>
            </div>
        </div>
    )
}


export default AboutUs