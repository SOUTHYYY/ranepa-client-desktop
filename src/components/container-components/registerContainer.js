import { connect } from 'react-redux';
import Register from "../registration-page/registration";
import {fetchVK, onRegister, clearData, updVkState} from "../../redux/actions/reg_actions";
import React, { Component } from "react";

const mapDispatchToProps = dispatch => {
    return {
        fetchVK: (id) => dispatch(fetchVK(id)),
        submitReg: (login, siteName, vkId, password) => dispatch(onRegister(login, siteName, vkId, password)),
        clearData: () => dispatch(clearData()),
        updVkState: (state) => dispatch(updVkState(state))
    }
};

const regStateToProps = ({ REGReducer, form }) => {
    return {
        reg: REGReducer,
        regForm: form
    }
};

class RegisterContainer extends Component {

    componentWillUnmount() {
        this.props.clearData();
    }

    render() {
        return <Register {...this.props} />
    }
}
export default connect(regStateToProps, mapDispatchToProps)(RegisterContainer)