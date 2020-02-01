import firebase from 'firebase';
import axios from "axios";

export const config = {
    apiKey: "AIzaSyDpDh_wuj9NfteTWqZeNBLVmu5FIgnd4OY",
    authDomain: "basic-lock-238415.firebaseapp.com",
    databaseURL: "https://basic-lock-238415.firebaseio.com",
    projectId: "basic-lock-238415",
    storageBucket: "basic-lock-238415.appspot.com",
    messagingSenderId: "723989397537",
    appId: "1:723989397537:web:0fb8d658b7b8556d"
};


export const loadData = async () =>{
    let dataS = null
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const serverData = await axios.get('https://basic-lock-238415.firebaseio.com/markers.json?auth=QpEDGE1BvmXlj6cSboFbxwCwkOsN3UBcLVxdj68o')
    return serverData
}
