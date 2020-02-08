import {logout} from '../../redux/actions/auth_actions'
import {connect} from "react-redux";
import {compose} from 'redux'
import Profile from "../profile";
import {AuthRedirect} from "../hoc/auth-redirect";

const mapStateToProps = state => ({
    login: state.AuthReducer.login,
    email: state.AuthReducer.email
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(Profile)