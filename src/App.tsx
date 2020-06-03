import React, { Suspense } from "react";
import "./App.css";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Loading from "./components/loading";

const Index = React.lazy(() => import("./pages/index"));
const About = React.lazy(() => import("./pages/about"));

function App() {
  return (
    <>
      <Router>
        <ThemeProvider>
          <CSSReset />
          <Header />
          <Switch>
            <Suspense fallback={<Loading />}>
              <Route path="/" exact component={Index} />
              <Route path="/about" component={About} />
            </Suspense>
          </Switch>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
