import React, { Component } from 'react';
import Map from './map-render';




class Caller extends Component {

    componentDidMount() {
        const { startFetch, API: { data } } = this.props;
        if (!data) {
            startFetch(false);
        }
    }

    render() {
        return (
            <Map startFetch={this.props.startFetch} data={this.props.API.data} auth={this.props.auth} {...this.props} />
        )
    }
}

export default Caller;