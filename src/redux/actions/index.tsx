import axios from "axios";
import { getToken } from "../../utils/accesstoken";
import { FETCH_EMPLOYEES, FETCH_CUSTOMERS, LOADING, ERROR, QUERY_EMPLOYEES } from "./types";

export const fetchEmployees = (employees: any) => {
  return {
    type: FETCH_EMPLOYEES,
    payload: employees,
  };
};

export const queryEmployees = (query: any) => {
  return {
    type: QUERY_EMPLOYEES,
    payload: query,
  };
};


export const fetchCustomers = (customers: any) => {
  return {
    type: FETCH_CUSTOMERS,
    payload: customers,
  };
};

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const error = (err: any) => {
  return {
    type: ERROR,
    payload: err,
  };
};

export const getEmployees = () => {
  const instance = axios.create({
    withCredentials: true,
  });
  let accessToken = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
    },
  };
  return async (dispatch: any) => {
    dispatch(loading);
    try {
      const res = await instance.get(
        "http://localhost:8080/api/employees",
        config
      );
      const users = res.data.data;
      dispatch(fetchEmployees(users));
    } catch (err) {
      dispatch(err);
    }
  };
};

export const searchEmployees = (id:string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  let accessToken = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
    },
  };
  return async (dispatch: any) => {
    try {
      const res = await instance.get(
        `http://localhost:8080/api/employees/search/${id}`,
        config
      );
      const users = res.data.data;
      dispatch(queryEmployees(users));
    } catch (err) {
      console.log(err);
      
    }
  };
};




export const getCustomers = () => {
  const instance = axios.create({
    withCredentials: true,
  });
  let accessToken = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
    },
  };
  return async (dispatch: any) => {
    dispatch(loading);
    try {
      const res = await instance.get(
        "http://localhost:8080/api/customers",
        config
      );
      const users = res.data.data;
      dispatch(fetchCustomers(users));
    } catch (err) {
      dispatch(err);
    }
  };
};
