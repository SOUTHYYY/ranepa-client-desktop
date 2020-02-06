import React, {Component} from 'react';
import {login} from '../../redux/actions/auth_actions'
import {connect} from "react-redux";
import {compose} from 'redux'
import Login from '../login/login'

const mapStateToProps = state => ({
    isAuth: state.AuthReducer.isAuth
})
const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login())
})


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Login)