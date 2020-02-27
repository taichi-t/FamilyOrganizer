import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";

//Reducer
import projectReducer from "./store/reducers/projectReducer";

//store
const store = createStore(projectReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
