import React, {Component} from 'react';
import MapboxGL from 'mapbox-gl';
import s from './mapbox-gl.css';
import MapContainer from "../components/container-components/map-container";
import {config} from './firebase/firebase-api';
import firebase from 'firebase';
import LayerStyle from './Pins';

export default class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            map: false,
            viewport: {
                zoom: 17,
                center: [43.9863, 56.3081]
            },
            data: null,
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

    createFeatureCollection(data) {
        let features = [];
        data.forEach(point => {
            features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        point.longitude,
                        point.latitude
                    ]
                },
                "properties": {
                    "header": "Тут заглавие",
                    "details": "Детали",
                    "time": "Тут время"
                }
            });
        });

        return {
            "type": "FeatureCollection",
            "features": features
        }
    }

    loadData() {
        const { data } = this.state;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        if (!data) {

            const datas = firebase.database().ref('markers').on('value', (snap) => {

                this.setState({
                    data: this.createFeatureCollection(this.snapshotToArray(snap))
                });


            })
        }
    }

    initializeMap() {
        MapboxGL.accessToken = this.state.token;

        let map = new MapboxGL.Map({
            container: 'map',
            style: this.props.apiStyle,
            ...this.state.viewport
        });

        map.on('load', () => {
            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": this.state.data
                },
                "paint": {
                    ...LayerStyle   // Стиль меток
                }
            })
        });

        map.on('click', 'points', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const { details, header, time } = e.features[0].properties;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 100) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new MapboxGL.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                <strong>${header}</strong><br />
                <em>${time}</em><br />
                <p>${details}</p>
                `)
                .addTo(map);
        });

        map.on('mouseenter', 'points', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'points', () => {
            map.getCanvas().style.cursor = '';
        });
        this.setState({ map });
    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        const { map, data } = this.state;
        if (data && !map) this.initializeMap();
        return (
            <div className="mapContainer">
                <div className="mapContainer" id="map"/>
            </div>
        )
    }
}