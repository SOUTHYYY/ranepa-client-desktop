import React from "react";
import styles from './marker-item.module.css'
import marker  from '../../../../images/profile/marker.svg'
import remove from '../../../../images/profile/quit.svg'

const markerItem  = ({item, idx}) => {
    const {title, description, date, address} = item
    return(
        <tr className={styles.markerItem}>
            <td align={"left"}>{idx + 1}</td>
            <td><img src={marker} alt={'marker'}/></td>
            <td>{title}</td>
            <td>{description}</td>
            <td>{date}</td>
            <td>{address}</td>
            <td>
                <img src={remove} alt='remove'/>
            </td>
        </tr>
    )
}

export default markerItem