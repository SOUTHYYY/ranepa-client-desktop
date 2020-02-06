import React from "react";
import styles from './button.module.css'


const Button = ({text, onClickFunc, disable}) => {
    const disabled = disable || false

    return(
        <button className={styles.btn} disabled={disabled} onClick={onClickFunc}>{text}</button>
    )
}

export default Button