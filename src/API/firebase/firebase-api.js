import firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyDpDh_wuj9NfteTWqZeNBLVmu5FIgnd4OY",
    authDomain: "basic-lock-238415.firebaseapp.com",
    databaseURL: "https://basic-lock-238415.firebaseio.com",
    projectId: "basic-lock-238415",
    storageBucket: "basic-lock-238415.appspot.com",
    messagingSenderId: "723989397537",
    appId: "1:723989397537:web:0fb8d658b7b8556d"
};

export function transformCollection(latitude, longitude) {
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                longitude,
                latitude
            ]
        },
        "properties": {
            "header": "Тут заглавие",
            "details": "Детали",
            "time": "Тут время"
        }
    }
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

export function updateFireData(latitude, longitude, user) {
    if (!firebase.app.length) {
        firebase.initializeApp(config);
    }

    firebase.database().ref('markers')
        .push({
            latitude: latitude,
            longitude: longitude,
            user: user
        })
}

export function getFireProfile(pass) {
    let response;
    firebase.database().ref('profiles')
        .orderByChild('password')
        .equalTo(pass)
        .once('value')
        .then((snap) => {
            if(snap.val()) {
                response = snap.val();
                console.log('Аккаунт подтвержден');
            } else console.log('Аккаунт не найдет');
        });
    return response;
}

export function findMarkersByUser(user) {
    let response;
    firebase.database().ref('markers')
        .orderByChild('user')
        .equalTo(user)
        .once('value')
        .then((snap) => {
            response = snap.val();
        })
}