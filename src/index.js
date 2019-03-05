import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";

import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { ActionCableProvider } from "react-actioncable-provider";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// console.log("getstate:", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ActionCableProvider url={process.env.REACT_APP_CABLE}>
        <App />
      </ActionCableProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
