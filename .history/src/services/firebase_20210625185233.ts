import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.,
  databaseURL: process.env.,
  projectId: process.env.,
  storageBucket: process.env.,
  messagingSenderId: process.env.,
  appId: process.env.
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();