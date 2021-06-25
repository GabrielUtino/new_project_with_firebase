import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBelWREM02eONHOyNfJhhXuYnOsg1FlaMs",
  authDomain: "my-first-project-89011.firebaseapp.com",
  projectId: "my-first-project-89011",
  storageBucket: "my-first-project-89011.appspot.com",
  messagingSenderId: "461385320646",
  appId: "1:461385320646:web:1e446e1ef13c0226e32fc7"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();