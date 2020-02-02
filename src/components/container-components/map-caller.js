import React, { Component } from 'react';
import firebase from "firebase";
import {config, snapshotToArray} from "../../API/firebase/firebase-api";
import Map from '../../API/map/map-render';



class Caller extends Component {
    constructor() {
        super();

        this.state = {
            data: null
        }
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

    componentDidMount() {
        const { data } = this.state;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        if (!data) {
            firebase.database().ref('markers').on('value', (snap) => {
                this.setState({
                    data: this.createFeatureCollection(this.snapshotToArray(snap))
                });
            })
        }
    }

    render() {
        return (
            <Map data={this.state.data}/>
        )
    }
}

export default Caller;