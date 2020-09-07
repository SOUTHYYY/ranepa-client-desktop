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

export function snapshotToArray(snapshot) {
    let returnArr = [];

    snapshot.forEach((childSnapshot) => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}

export function transformData(obj) {
    return Object.keys(obj).map(key => {
        return obj[key] = {...obj[key], key: key};
    })
}

export async function _getGeocoderResourse(latitude, longitude) {
    let __address_data = {
        address: null
    };
    await axios.get(`${mapConfig.geoCoderAPI}/${longitude},${latitude}.json?access_token=${mapConfig.token}`)
        .then((res) => {
            res.data.features.length && res.data.features[0].properties.hasOwnProperty('address') ?
            res.data.features[0].properties.address.length ?
                __address_data.address = res.data.features[0].properties.address
                :
                __address_data.address = res.data.features[0].text
                : __address_data.address = "Адрес не найден"
        });
    return __address_data.address;
}
async function checkUser(login) {
    let result = null;
    await firebase.database().ref('profiles')
        .once('value')
        .then((snap) =>
            result = snap.hasChild(login)
        );
    return result
}
export async function registerUser(login, siteName, vkId, password) {
    let hasUser = await checkUser(login);
    if(hasUser) return false;
    await firebase.database().ref('profiles')
        .child(login).set({
            id: Math.floor(Math.random()*10000 * Math.floor(6)),
            login: login,
            password: password,
            siteName: siteName,
            vkId: vkId
        });
    return true;
}
export async function updateFireData(latitude, longitude, user, description, dateBegin) {
    let recievedData = await _getGeocoderResourse(latitude, longitude);
    firebase.database().ref('markers')
        .push({
            dateBegin: dateBegin,
            description: description,
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
    let response = null;
    await firebase.database().ref('markers')
        .orderByChild('user')
        .equalTo(user)
        .once('value')
        .then((snap) => {
            response = snap.val();
        });
    return response
}

export async function deleteMarker(key) {
    let markerRef = firebase.database().ref('markers/' + key);
    await markerRef.remove().then().catch((err) => console.log('err' + err))
}

