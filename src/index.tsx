import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./Context/authcontext";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./redux/reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//REDUX DEV TOOLS
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
