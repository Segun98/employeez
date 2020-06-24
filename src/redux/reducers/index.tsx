import { combineReducers } from "redux";
import { Employees } from "./fetchEmployees";
import { Customers } from "./fetchCustomers";

const allReducers = combineReducers({ Employees, Customers });

export default allReducers;
