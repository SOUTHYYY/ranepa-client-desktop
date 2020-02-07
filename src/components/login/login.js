import React, {Component} from 'react';
import Input from "../UI/input/input";
import styles from './login.module.css'
import { Redirect } from 'react-router-dom'
import Button from "../UI/button/button";
import ranepa from '../../images/login/ranepa.png'


class Login extends Component {
    state = {
        isFormValid: false,
        formControls: {
            login: {
                value: '',
                type: 'login',
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
        event.preventDefault()
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    inpytType={control.type}
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
        if(isAuth) {
            return <Redirect to={'/map'} />
        }
        return (
            <div className={styles.login}>
                <img src={ranepa} alt='ranepa' />
                <h2>Enter NIU RANEPA</h2>
                <form onSubmit={(e) => this.handleSubmit(e)} className={styles.login__form}>
                    {this.renderInputs()}
                    {/*<Button*/}
                    {/*    text='Войти'*/}
                    {/*    onClickFunc={}*/}
                    {/*    disable={!this.state.isFormValid}/>*/}
                        <button
                            disabled={!this.state.isFormValid}
                            onClick={() => this.props.login(this.state.formControls.login.value, this.state.formControls.password.value)}>Войти</button>
                </form>
            </div>
        );
    }
}

export default Login;