import React, {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import s from './mapbox-gl.css';
import Pin from './Pins';
import MapContainer from "../components/container-components/map-container";
import {config} from './firebase/firebase-api';
import firebase from 'firebase';
import axios from 'axios';

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
            coords: [],
            token: 'pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w'
        };
    }
    snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };

    loadData() {
        const { data } = this.state;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        const datas = firebase.database().ref('markers').on('value', (snap) => {
            this.setState({
                coords: this.snapshotToArray(snap)
            })
        })
    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        const { coords } = this.state;
        return (
            <div className="mapContainer">
                <MapGL{...this.state.viewport}
                      mapStyle={this.props.apiStyle}
                      mapboxApiAccessToken={this.state.token}
                      onViewportChange={(viewport) => this.setState({viewport})}>

                    {coords.map((coord, i) =>
                        <Marker key={i} latitude={coord.latitude} longitude={coord.longitude}>
                            <Pin/>
                        </Marker>
                    )}

                </MapGL>
            </div>
        )
    }
}