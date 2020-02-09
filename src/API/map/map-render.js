import React, {Component} from 'react';
import MapboxGL from 'mapbox-gl';
import './mapbox-gl.css';
import LayerStyle from './mapConfig';

import {transformCollection, updateFireData} from "../firebase/firebase-api";


export default class Application extends Component {

    constructor(props) {
        super(props);
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
            if(!result.length && map.getSource('points') && state.auth.isAuth) {
                state.data.features.push(transformCollection(coords.lngLat.lat, coords.lngLat.lng));
                map.getSource('points').setData(state.data);
               updateFireData(coords.lngLat.lat, coords.lngLat.lng, state.auth.login);
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