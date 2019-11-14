import React from "react";
//where does ReactDOM go?
import ReactDOM from "react-dom";
//todo look @ my css file
import "./index.css";

/*todo what's the difference between index.js & app.js? what's the higherarchy?
 *  I'm not totally confident, but I think index.js is the root file, because it is importing app.js */
import App from "./App";
import Debugger from "./debugger";

/*todo how can I make my app look best? should I use semantic or not? what matters most for my portfolio?*/
// import "semantic-ui-css/semantic.min.css";

/*todo how can I transition to combine reducers? look @ gigi's lecture? perhaps look @
 *  how Traversy Brad did it in DevConnector?*/

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { ActionCableProvider } from "react-actioncable-provider";

import { createStore, applyMiddleware, compose } from "redux"; // lines 17-18; allows for redux devtools
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const initialState = {};
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk))
// );

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

/*todo this is how i get an environment variable. look more into this when I am trying to deploy on heroku*/

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
