import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./components/childComponents/globalStyle";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./components/childComponents/Muitheme";

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
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
  );
});
