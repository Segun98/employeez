import React, { Suspense, useEffect } from "react";
import "./styles/App.css";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Loading from "./components/loading";
import { createStore, compose } from "redux";
import allReducers from "./reducers/index";
import { Provider } from "react-redux";
import { getToken, setToken } from "./utils/accesstoken";
import axios from "axios";

const Index = React.lazy(() => import("./pages/index"));
const About = React.lazy(() => import("./pages/about"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));
const editDashboard = React.lazy(() => import("./pages/editDashboard"));
const Employees = React.lazy(() => import("./pages/employees"));
const Employee = React.lazy(() => import("./pages/Employee"));
const editEmployee = React.lazy(() => import("./pages/editEmployee"));
const Customers = React.lazy(() => import("./pages/customers"));
const Customer = React.lazy(() => import("./pages/Customer"));
const editCustomer = React.lazy(() => import("./pages/editCustomer"));
const Login = React.lazy(() => import("./pages/Login"));
// const Signup = React.lazy(() => import("./pages/Signup"));

//REDUX DEV TOOLS
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancers());

function App() {
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(
        "http://localhost:8080/api/refreshtokens"
      );
      setToken(res.data.accessToken);
      console.clear();
    } catch (error) {
      console.log(error.message);
      console.clear();
    }
    console.clear();
  }
  return (
    <>
      <Provider store={store}>
        <Router>
          <ThemeProvider>
            <CSSReset />
            <Switch>
              <Suspense fallback={<Loading />}>
                <Route path="/" exact component={Index} />
                <Route path="/login" component={Login} />
                {/* <Route path="/signup" component={Signup} /> */}
                <Route path="/about" component={About} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  path="/dashboard/edit"
                  component={editDashboard}
                />
                <PrivateRoute path="/employees" component={Employees} />
                <PrivateRoute path="/employee/:id" component={Employee} />
                <PrivateRoute
                  path="/employee/edit/:id"
                  component={editEmployee}
                />
                <PrivateRoute path="/customers" component={Customers} />
                <PrivateRoute path="/customer/:id" component={Customer} />
                <PrivateRoute
                  path="/customer/edit/:id"
                  component={editCustomer}
                />
              </Suspense>
            </Switch>
          </ThemeProvider>
        </Router>
      </Provider>
    </>
  );
}
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  let history = useHistory();

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, []);

  async function fetchdata() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(
        "http://localhost:8080/api/refreshtokens"
      );
      if (res.data.accessToken) {
        setToken(res.data.accessToken);
        console.clear();
        return history.goBack();
      }
    } catch (error) {
      console.log(error.message);
      console.clear();
    }
    console.clear();
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (getToken()) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default App;
