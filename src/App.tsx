import React, { Suspense, useEffect } from "react";
import "./styles/App.css";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loading from "./components/loading";
import { createStore, compose } from "redux";
import allReducers from "./redux/reducers/index";
import { Provider } from "react-redux";
import { setToken } from "./utils/accesstoken";
import axios from "axios";
import Signup from "./pages/Signup";
import Index from "./pages";
import About from "./pages/about";
import Login from "./pages/Login";
import { useAuth } from "./Context/authcontext";

const Dashboard = React.lazy(() => import("./pages/dashboard"));
const CreateDashboard = React.lazy(() => import("./pages/CreateDashboard"));
const EditDashboard = React.lazy(() => import("./pages/editDashboard"));
const Employees = React.lazy(() => import("./pages/employees"));
const AddEmployee = React.lazy(() => import("./pages/AddEmployee"));
const Employee = React.lazy(() => import("./pages/Employee"));
const EditEmployee = React.lazy(() => import("./pages/editEmployee"));
const Customers = React.lazy(() => import("./pages/customers"));
const Customer = React.lazy(() => import("./pages/Customer"));
const AddCustomer = React.lazy(() => import("./pages/AddCustomer"));
const EditCustomer = React.lazy(() => import("./pages/editCustomer"));
const SendMail = React.lazy(() => import("./pages/SendMail"));
const CustomerMail = React.lazy(() => import("./pages/CustomerMail"));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //authentication check from context
  const { setisAuth }: any = useAuth()!;

  //fetch refresh tokens on page refresh
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
        setisAuth(true);
      }
      console.clear();
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setisAuth(false);
      }
      console.log(error.message);
    }
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
                <Route path="/signup" component={Signup} />
                <Route path="/about" component={About} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute
                  path="/dashboard/edit"
                  component={EditDashboard}
                />
                <PrivateRoute
                  path="/dashboard/create"
                  component={CreateDashboard}
                />
                <PrivateRoute path="/employees" exact component={Employees} />
                <PrivateRoute path="/add-employee" component={AddEmployee} />
                <PrivateRoute path="/employee/:id" component={Employee} />
                <PrivateRoute
                  path="/edit-employee/:id"
                  component={EditEmployee}
                />
                <PrivateRoute path="/customers" component={Customers} />
                <PrivateRoute path="/add-customer" component={AddCustomer} />
                <PrivateRoute path="/customer/:id" component={Customer} />
                <PrivateRoute
                  path="/edit-customer/:id"
                  component={EditCustomer}
                />
                <PrivateRoute path="/send-mail" component={SendMail} />
                <PrivateRoute path="/customer-mail" component={CustomerMail} />
              </Suspense>
            </Switch>
          </ThemeProvider>
        </Router>
      </Provider>
    </>
  );
}
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  //coming from context
  const { isAuth }: any = useAuth()!;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
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
