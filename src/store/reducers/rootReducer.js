import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import projectReducer from "./projectReducer";

export const initialState = {};

export const rootReducer = combineReducers({
  project: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
