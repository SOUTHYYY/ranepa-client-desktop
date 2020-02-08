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
                debugger;
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
