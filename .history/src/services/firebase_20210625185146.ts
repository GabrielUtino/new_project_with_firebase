import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "my-first-project-89011.firebaseapp.com",
  databaseURL: "https://my-first-project-89011-default-rtdb.firebaseio.com",
  projectId: "my-first-project-89011",
  storageBucket: "my-first-project-89011.appspot.com",
  messagingSenderId: "461385320646",
  appId: "1:461385320646:web:8a29227fd42a4216e32fc7"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();