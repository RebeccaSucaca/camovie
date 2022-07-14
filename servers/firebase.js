// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
// import firebaseAuth from "firebase/auth";
import { getAuth } from "firebase/auth";


const config = {
    apiKey: "AIzaSyAF0Ok8be3PN9Curd4J5HSFRDE1FG73H3s",
    authDomain: "camovie-6d182.firebaseapp.com",
    projectId: "camovie-6d182",
    storageBucket: "camovie-6d182.appspot.com",
    messagingSenderId: "452257891142",
    appId: "1:452257891142:web:3b3d8af68c255505cb9b47"
};

export const app = initializeApp(config);
export const auth = getAuth(app);
