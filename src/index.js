import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import fbConfig from "./firebase/index";
// import "firebase/firestore";
import { reactReduxFirebase } from "react-redux-firebase";
//Reducer
import rootReducer from "./store/reducers/rootReducer";
import { applyMiddleware } from "redux";

import { getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";

// initialize Firestore

//store

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, {
      userProfile: "users",
      useFirestoreForProfile: true
    }),
    reduxFirestore(fbConfig)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
