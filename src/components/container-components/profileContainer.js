import {logout, OnSetAuthUserData} from '../../redux/actions/auth_actions'
import {fethUserPins, fetchVkData} from '../../redux/actions/api_actions'
import {connect} from "react-redux";
import {compose} from 'redux'
import Profile from "../profile";
import {AuthRedirect} from "../hoc/auth-redirect";
import React, {Component} from "react";


class ProfileContainer extends Component {
    componentDidMount() {
        this.props.fethUserPins(this.props.login);
        this.props.fetchVkData(this.props.vkId);
    }

    render() {
        if(!this.props.vkData.hasOwnProperty('response')) {
            return <span>ЗАГРУЖАЕМ!</span>
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
    icon: state.AuthReducer.icon,
    userPins: state.APIReducer.userPins
});

export default compose(
    connect(mapStateToProps, {logout, fethUserPins, OnSetAuthUserData, fetchVkData}),
    AuthRedirect
)(ProfileContainer)