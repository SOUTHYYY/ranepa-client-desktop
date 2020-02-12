import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
import './mapbox-gl.css';
import windowSize from 'react-window-size';
import Pins from './Pins';
import mapConfig from './mapConfig';



const TOKEN = 'pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w'; // Set your mapbox token here

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 56.3081,
                longitude: 43.9863,
                zoom: 17,
                bearing: 0,
                pitch: 0
            },
            popupInfo: null
        };
    }

    _updateViewport = viewport => {
        const { height, width, ...etc } = viewport;
        this.setState({viewport: etc});
    };

    _onClickMarker = city => {
        this.setState({popupInfo: city});
    };

    smFunc(event) {
        event.preventDefault();
        console.log('lol')
    }
    _renderPopup() {
        const {popupInfo} = this.state;
debugger;
        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={() => this.setState({popupInfo: null})}
                    onMouseEnter={() => {
                        document.body.style.cursor = "pointer";
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = "default";
                    }}
                >
                    <form onSubmit={false}>
                        <strong className="popup-text-header">{popupInfo.siteName}</strong><br/>
                        <em className="popup-text-address">{popupInfo.address}</em><br/>
                        <p className="popup-text-details">Детали</p>
                        <button onClick={(e) => this.smFunc(e)}>Tap here</button>
                    </form>
                </Popup>
            )
        );
    }

    render() {
        const {viewport} = this.state;
        const mapPins = this.props.data ? <Pins data={this.props.data} onClick={this._onClickMarker} /> : null;


        return (
            <MapGL
                width="100vw"
                height="100vh"
                {...viewport}
                mapStyle={mapConfig.apiStyle}
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={mapConfig.token}
                className='mapContainer'
            >
                {mapPins}

                {this._renderPopup()}

            </MapGL>
        );
    }
}

export default windowSize(App);