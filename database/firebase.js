import firebase from "firebase";

import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyACQMiOWIOzUs_sOMDzSO2lIW-UKM22Z88",
    authDomain: "plataforma-dev-34ce8.firebaseapp.com",
    databaseURL: "https://plataforma-dev-34ce8-default-rtdb.firebaseio.com",
    projectId: "plataforma-dev-34ce8",
    storageBucket: "plataforma-dev-34ce8.appspot.com",
    messagingSenderId: "977283177257",
    appId: "1:977283177257:web:760fab9be4a6ab5a7d3538"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const st = firebase.storage();

  export default {
      firebase,
      db,
      st
  }