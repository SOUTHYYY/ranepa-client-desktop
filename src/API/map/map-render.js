import React, {Component} from 'react';
import MapboxGL from 'mapbox-gl';
import s from './mapbox-gl.css';
import LayerStyle from './mapConfig';

import firebase from "firebase";
import {config} from "../firebase/firebase-api";

export default class Application extends Component {

    constructor(props) {
        super(props);
        firebase.initializeApp(config);

        this.state = {
            markName: '',
            map: false,
            viewport: {
                zoom: 17,
                center: [43.9863, 56.3081]
            },
            data: null
        };
    }

    createFeatureCollectionOnce(data) {
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

    componentWillUnmount() {
        window.location.reload();
    }

    static initializeMap = (state, viewport) => {
        MapboxGL.accessToken = LayerStyle.token;

        if(!map) {
            var map = new MapboxGL.Map({
                container: 'map',
                style: `${LayerStyle.apiStyle}`,
                ...viewport
            });
        }


        map.on('load', () => {
            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": state.data
                },
                "paint": {
                    ...LayerStyle.pinsConfig   // Стиль меток
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

        map.on('click', (coords) => {

            const result = map.queryRenderedFeatures(coords.point, { layers: ['points']});
            if(!result.length) {
                firebase.database().ref('markers')
                    .push({
                        latitude: coords.lngLat.lat,
                        longitude: coords.lngLat.lng
                    });
            }

        });

        return { map };
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { map, data } = nextProps;
        if (data && !map) return Application.initializeMap(nextProps, prevState.viewport);
        else return null;
    }

    render() {

        return (
            <div className="mapContainer">
                <div className="mapContainer" id="map"/>
            </div>
        )
    }
}