import React from "react";
import styles from './marker-item.module.css'
import marker  from '../../../../images/profile/marker.svg'
import remove from '../../../../images/profile/quit.svg'
import {deleteMarker} from "../../../../API/firebase/firebase-api";

const markerItem  = ({item, idx, deleteMark}) => {
    const {description, date, address, key} = item;

    return(
        <tr className={styles.markerItem}>
            <td align={"left"}>{idx + 1}</td>
            <td><img src={marker} alt={'marker'}/></td>
            <td>{description}</td>
            <td>{date}</td>
            <td>{address}</td>
            <td>
                <img src={remove} alt='remove' onClick={() => {deleteMarker(key); deleteMark(idx)}} style={{cursor: 'pointer'}}/>
            </td>
        </tr>
    )
}

export default markerItem