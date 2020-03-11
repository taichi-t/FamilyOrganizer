import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAghUTn5PgKu-lCUq-3XoexpcpTKLaZXnE",
  authDomain: "practice-39f2a.firebaseapp.com",
  databaseURL: "https://practice-39f2a.firebaseio.com",
  projectId: "practice-39f2a",
  storageBucket: "practice-39f2a.appspot.com",
  messagingSenderId: "580830759321",
  appId: "1:580830759321:web:d4fac227af596391952b08"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
