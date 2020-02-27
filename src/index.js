import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import fbConfig from "./config/fbConfig";
import { compose } from "redux";
import reduxFirestore from "redux-firestore";

//Reducer
// import projectReducer from "./store/reducers/projectReducer";
import { rootReducer } from "./store/reducers/rootReducer";

//firebase
import firebase from "firebase";
import { reactReduxFirebase } from "react-redux-firebase";
import "firebase/firestore";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

firebase.initializeApp(fbConfig);

firebase.firestore();

const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
