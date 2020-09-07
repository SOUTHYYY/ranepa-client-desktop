import React, { Component } from 'react';
import Map from './map-render';




class Caller extends Component {

    componentDidMount() {
        const { startFetch, API: { data }, welcomeScreen } = this.props;
        if (!data) {
            return welcomeScreen ? null : startFetch(false);
        }
    }

    render() {
        return (
            <Map startFetch={this.props.startFetch} auth={this.props.auth} {...this.props} />
        )
    }
}

export default Caller;