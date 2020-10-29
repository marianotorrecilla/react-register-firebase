import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCWU9fIFAAzJylAsEaw1WFerX8YZD_6B44",
    authDomain: "react-register-87f62.firebaseapp.com",
    databaseURL: "https://react-register-87f62.firebaseio.com",
    projectId: "react-register-87f62",
    storageBucket: "react-register-87f62.appspot.com",
    messagingSenderId: "399152310070",
    appId: "1:399152310070:web:4d5e02be9eaf297ed3f597"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();