import React from "react";
import styles from './button.module.css'


const Button = ({onClickFunc, disable, children}) => {
    debugger
    const disabled = disable || false
    let cls = `${styles.btn} `
    if(disabled) {
        cls += [styles.disabled]
    }else cls += [styles.active]
    return(
        <button className={cls} disabled={disabled} onClick={onClickFunc}>{children}</button>
    )
}

export default Button