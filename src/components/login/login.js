import React, {Component} from 'react';
import styles from './login.module.css'
import {Redirect} from 'react-router-dom'
import {Button, Input} from '../UI';
import ranepa from '../../images/login/ranepa.png'


class Login extends Component {
    state = {
        isFormValid: false,
        formControls: {
            login: {
                value: '',
                type: 'text',
                label: 'Логин',
                errorMessage: 'Введите корректный Логин',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            }
        }
    }
    validate = (value, validation) => {
        if (!validation) return true
        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        return isValid
    }
    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validate(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        console.log('VALUE', this.state.formControls.login.value)
        this.setState({
            formControls, isFormValid
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    inputType={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        const {isAuth} = this.props
        if (isAuth) {
            return <Redirect to={'/map'}/>
        }
        return (
            <div className={styles.login}>
                <img src={ranepa} alt='ranepa'/>
                <h2>Войти в клиент</h2>
                <form onSubmit={(e) => this.handleSubmit(e)} className={styles.login__form}>
                    {this.renderInputs()}
                    <Button
                        type='password'
                        onClickFunc={() => this.props.login(this.state.formControls.login.value, this.state.formControls.password.value)}
                        disable={!this.state.isFormValid}>Войти</Button>
                </form>
            </div>
        );
    }
}

export default Login;