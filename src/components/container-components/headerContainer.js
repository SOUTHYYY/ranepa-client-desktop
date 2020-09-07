import { connect } from 'react-redux';
import Header from "../header/header";

const mapStateToProps = state => {
    return {
        isAuth: state.AuthReducer.isAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);