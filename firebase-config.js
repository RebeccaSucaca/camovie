// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
  // "apiKey": "AIzaSyA9KnVkn_gLivqxP7EjGRbYUp2TyE8m8e4",
  // "authDomain": "camovie-89887.firebaseapp.com",
  // "projectId": "camovie-89887",
  // "storageBucket": "camovie-89887.appspot.com",
  // "messagingSenderId": "404321714745",
  // "appId":"1:404321714745:web:6f47010f4252c8ef0803e8",
  // "measurementId": "G-X795B72L5M"
  apiKey: "AIzaSyAF0Ok8be3PN9Curd4J5HSFRDE1FG73H3s",
  authDomain: "camovie-6d182.firebaseapp.com",
  projectId: "camovie-6d182",
  storageBucket: "camovie-6d182.appspot.com",
  messagingSenderId: "452257891142",
  appId: "1:452257891142:web:3b3d8af68c255505cb9b47"
};

export default function Firebase() {
  // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export default app;
initializeApp(firebaseConfig);
}

// export default Firebase;