import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./fbConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
