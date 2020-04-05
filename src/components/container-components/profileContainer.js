import {logout, OnSetAuthUserData} from '../../redux/actions/auth_actions'
import {fethUserPins, fetchVkData} from '../../redux/actions/api_actions'
import {connect} from "react-redux";
import {compose} from 'redux'
import Profile from "../profile";
import {AuthRedirect} from "../hoc/auth-redirect";
import React, {Component} from "react";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {Loading} from "../timetable/timetable";
import {NavLink} from "react-router-dom";

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.fethUserPins(this.props.login);
        this.props.fetchVkData(this.props.vkId);
    }

    render() {
        if(!this.props.vkData.hasOwnProperty('response')) {
            return this.props.vkData === 'failed' ?
                <Alert severity="error">
                    <AlertTitle>
                        Критическая ошибка
                    </AlertTitle>
                    Кажется в нашей системе произошел сбой. <br/><br/>
                    <NavLink to='/login'>
                        <Button onClick={() => this.props.logout()} variant="contained" color="secondary">
                            Сбросить настройки
                        </Button>
                    </NavLink>
                </Alert>
             : <Loading/>


        } else {
            return (
                <Profile {...this.props}/>
            )
        }
    }
}

const mapStateToProps = state => ({
    vkId: state.AuthReducer.vkId,
    vkData: state.APIReducer.vkData,
    loader: state.APIReducer.loading,
    error: state.APIReducer.errorMessage,
    login: state.AuthReducer.login,
    siteName: state.AuthReducer.siteName,
    userPins: state.APIReducer.userPins
});

export default compose(
    connect(mapStateToProps, {logout, fethUserPins, OnSetAuthUserData, fetchVkData}),
    AuthRedirect
)(ProfileContainer)