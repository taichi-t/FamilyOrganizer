import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";

//Reducer
import rootReducer from "./store/reducers/rootReducer";

//firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
//config
import fbConfig from "./config/fbConfig";

// const store = createStore(projectReducer);

const rrfConfig = {
  userProfile: "users"
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const initialState = {};
const store = createStore(rootReducer, initialState);

firebase.initializeApp(fbConfig);

firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
