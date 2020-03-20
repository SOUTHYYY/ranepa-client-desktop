import React from 'react';
import styles from './input.module.css'

function Input(props) {
    const isInvalid = ({valid, shouldValidate, touched}) => {
        return !valid && shouldValidate && touched
    }

    const inputType = props.inputType || 'text'
    let cls = [styles.input]
    const htmlFor = props.htmlFor || `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(styles.invalid)
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={props.inputType}
                value={props.value}
                onChange={props.onChange}/>
        </div>

    );
}

export default Input;