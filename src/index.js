import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import SignIn from "../src/components/auth/SignIn";
import SignUp from "../src/components/auth/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});
