import {login} from '../../redux/actions/auth_actions'
import {connect} from "react-redux";
import {compose} from 'redux'
import Login from '../login/login'

const mapStateToProps = state => ({
    isAuth: state.AuthReducer.isAuth,
    isFailed: state.AuthReducer.isFailed
})
// const mapDispatchToProps = dispatch => ({
//     login: () => dispatch(login())
// })


export default compose(
    connect(mapStateToProps, {login}),
)(Login)