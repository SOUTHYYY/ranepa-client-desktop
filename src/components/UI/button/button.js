import React from "react";
import styles from './button.module.css'


const Button = ({text, onClickFunc, disable}) => {
    const disabled = disable || false
    let cls = `${styles.btn} `
    if(disabled) {
        cls += [styles.disabled]
    }else cls += [styles.active]
    return(
        <button className={cls} disabled={disabled} onClick={onClickFunc}>{text}</button>
    )
}

export default Button