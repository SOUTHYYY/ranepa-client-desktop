import React, {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import s from './mapbox-gl.css';
import Pin from './Pins';
import MapContainer from "../components/container-components/map-container";

export default class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 1920,
                height: 1280,
                zoom: 17,
                latitude: 56.3081,
                longitude: 43.9863
            },
            token: 'pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w'
        };
    }

    render() {
        return (
            <div className="mapContainer">
                <MapGL{...this.state.viewport}
                      mapStyle={this.props.apiStyle}
                      mapboxApiAccessToken={this.state.token}
                      onViewportChange={(viewport) => this.setState({viewport})}>
                    <Marker latitude={56.3081} longitude={43.9863}>
                        <Pin/>
                    </Marker>
                </MapGL>
            </div>
        )
    }
}