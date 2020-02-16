import React, { Component } from 'react';
import firebase from "firebase";
import {config, snapshotToArray} from "../firebase/firebase-api";
import Map from './map-render';




class Caller extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { startFetch, API: { data } } = this.props;
        if (!data) startFetch();
    }

    render() {
        return (
            <Map startFetch={this.props.startFetch} data={this.props.API.data} auth={this.props.auth} {...this.props} />
        )
    }
}

export default Caller;