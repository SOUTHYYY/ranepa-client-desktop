import {logout} from '../../redux/actions/auth_actions'
import {fethUserPins} from '../../redux/actions/api_actions'
import {connect} from "react-redux";
import {compose} from 'redux'
import Profile from "../profile";
import {AuthRedirect} from "../hoc/auth-redirect";
import React, {Component} from "react";


class ProfileContainer extends Component {
    componentDidMount() {
        this.props.fethUserPins(this.props.login)
    }

    render() {
        if(this.props.loading) {
            return <span>ЗАГРУЖАЕМ!</span>
        }
        return (
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    login: state.AuthReducer.login,
    siteName: state.AuthReducer.siteName,
    icon: state.AuthReducer.icon,
    userPins: state.APIReducer.userPins,
    loading: state.APIReducer.loading

})

export default compose(
    connect(mapStateToProps, {logout, fethUserPins}),
    AuthRedirect
)(ProfileContainer)