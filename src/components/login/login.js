import React, {Component} from 'react';
import styles from './login.module.css'
import {NavLink, Redirect} from 'react-router-dom'
import {Input} from '../UI';
import ranepa from '../../images/login/ranepa.png'
import ButtonUI from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {offsets} from "../../offsets/offsets";

class Login extends Component {
    state = {
        alertState: false,
        alertAction: 'none',
        isFormValid: false,
        formControls: {
            login: {
                value: '',
                type: 'text',
                label: offsets.login.loginLabel,
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
                label: offsets.login.passwordLabel,
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                }
            }
        }
    };


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({alertState: nextProps.isFailed})
    }

    validate = (value, validation) => {
        if (!validation) return true;
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        return isValid
    };
    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validate(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });
        this.setState({
            formControls, isFormValid
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    handleClose = () => {
            this.props.AuthFail(false)
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
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
        const {isAuth} = this.props;
        if (isAuth) {
            return <Redirect to={'/map'}/>
        }
        return (
            <div className={styles.login}>
                <Snackbar open={this.state.alertState} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} icon={<VpnKeyIcon fontSize="inherit"/>} severity="warning">
                        {offsets.login.alertErrorLogin}
                    </Alert>
                </Snackbar>
                <img src={ranepa} alt='ranepa'/>
                <h2>{offsets.login.loginHeader}</h2>
                <form onSubmit={(e) => this.handleSubmit(e)} className={styles.login__form}>
                    {this.renderInputs()}
                        <ButtonUI variant="contained"
                              onClick={() => this.props.login(this.state.formControls.login.value, this.state.formControls.password.value)}
                              disabled={!this.state.isFormValid}>
                        {offsets.login.loginButton}
                    </ButtonUI>
                </form>
                <br/>
                или
                <br/><br/>
                <NavLink to={'/reg'}>
                    <ButtonUI variant="contained">
                        Регистрация
                    </ButtonUI>
                </NavLink>
            </div>
        );
    }
}

export default Login;
