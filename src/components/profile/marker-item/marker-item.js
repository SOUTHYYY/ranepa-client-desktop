import React from "react";
import styles from './marker-item.module.css'
import marker  from '../../../images/profile/marker.svg'

const markerItem  = ({item, idx}) => {
    const {title, mainInfo, date, adress} = item
    return(
        <tr className={styles.markerItem}>
            <td align={"left"}>{idx + 1}</td>
            <td><img src={marker} alt={'marker'}/></td>
            <td>{title}</td>
            <td>{mainInfo}</td>
            <td>{date}</td>
            <td>{adress}</td>
        </tr>
    )
}

export default markerItem