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
export function foo() {

}
export function updateFireData(latitude, longitude) {
    if (!firebase.app.length) {
        firebase.initializeApp(config);
    }

    firebase.database().ref('markers')
        .push({
            latitude: latitude,
            longitude: longitude
        })
}