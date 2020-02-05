import React, {Component} from 'react';
import Input from "../UI/input/input";
import styles from './login.module.css'
import { Redirect } from 'react-router-dom'


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Login extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
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
        if (validation.email) {
            isValid = validateEmail(value) && isValid
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
                <h2>Войти в NIU RANEPA</h2>
                <form onSubmit={(e) => this.handleSubmit(e)} className={styles.login__form}>
                    {this.renderInputs()}
                    <button onClick={this.props.login} disabled={!this.state.isFormValid}>Войти</button>
                </form>
            </div>
        );
    }
}

export default Login;