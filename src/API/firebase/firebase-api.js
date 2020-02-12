import React from 'react';
import firebase from 'firebase';
import axios from "axios";
import mapConfig from "../map/mapConfig";

export const config = {
    apiKey: "AIzaSyDpDh_wuj9NfteTWqZeNBLVmu5FIgnd4OY",
    authDomain: "basic-lock-238415.firebaseapp.com",
    databaseURL: "https://basic-lock-238415.firebaseio.com",
    projectId: "basic-lock-238415",
    storageBucket: "basic-lock-238415.appspot.com",
    messagingSenderId: "723989397537",
    appId: "1:723989397537:web:0fb8d658b7b8556d"
};

export async function transformCollection(latitude, longitude, profile) {
let colObject = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [
            longitude,
            latitude
        ]
    },
    "properties": {
        "header": `${profile.siteName}`,
        "details": "Детали",
        "address": `${await _getGeocoderResourse(latitude, longitude)}`
    }
}

return colObject;
}

export function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}

export function transformData(obj) {

    return Object.keys(obj).map(key => {
        return obj[key];
    })
}

async function _getGeocoderResourse(latitude, longitude) {
    let __address_data = {
        address: null
    };
    await axios.get(`${mapConfig.geoCoderAPI}/${longitude},${latitude}.json?access_token=${mapConfig.token}`)
        .then((res) => {


            res.data.features[0].properties.hasOwnProperty('address') ?
            res.data.features[0].properties.address.length ?
                __address_data.address = res.data.features[0].properties.address
                :
                __address_data.address = res.data.features[0].text
                : __address_data.address = "Адрес не найден"
        });
    return __address_data.address;
}

export async function updateFireData(latitude, longitude, user) {

    let recievedData = await _getGeocoderResourse(latitude, longitude);
debugger;
    firebase.database().ref('markers')
        .push({
            latitude: latitude,
            longitude: longitude,
            user: user.login,
            siteName: user.siteName,
            address: recievedData,
            date: `${(new Date().getDate())}.${(new Date().getMonth()+1)}.${(new Date().getFullYear())}`
        });
}

export async function getFireProfile(pass, login) {

    let _login_state = {
        isAuthed: false,
        data: {},
        resultCode: null
    };


    const __login_data = await firebase.database().ref('profiles')
        .orderByChild('login')
        .equalTo(login)
        .once('value')
        .then((snap) => {
            if(snap.val()) {
                _login_state.isAuthed = true;
                _login_state.data = snap.child(login).val();
                return true
            } else {
                console.error('Логин не найден!!');
                return false;
            }
        });
    __login_data ?
        await firebase.database().ref('profiles/' + login)
        .orderByValue()
        .equalTo(pass)
        .once('value')
        .then((snap) => {
            if(snap.val()) {
                _login_state.resultCode = 0;
            } else _login_state.resultCode = 1;
        }) : _login_state.resultCode = 1;

    return _login_state;
}

export async function findMarkersByUser(user) {
    let response = null
    await firebase.database().ref('markers')
        .orderByChild('user')
        .equalTo(user)
        .once('value')
        .then((snap) => {
            response = snap.val();
        })
    return response
}

