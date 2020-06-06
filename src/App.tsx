import React, { Suspense } from "react";
import "./App.css";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Loading from "./components/loading";
import { createStore } from "redux";
import  allReducers from "./reducers/index";
import { Provider } from "react-redux";

const Index = React.lazy(() => import("./pages/index"));
const About = React.lazy(() => import("./pages/about"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));

let store = createStore(allReducers);

// console.log(store.subscribe(()=> store.getState()))

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <ThemeProvider>
            <CSSReset />
            <Header />
            <Switch>
              <Suspense fallback={<Loading />}>
                <Route path="/" exact component={Index} />
                <Route path="/about" component={About} />
                <Route path="/dashboard" component={Dashboard} />
              </Suspense>
            </Switch>
          </ThemeProvider>
        </Router>
      </Provider>
    </>
  );
}

export default App;
