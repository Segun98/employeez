import axios from "axios";
import { getToken } from "../../utils/accesstoken";
import {
  FETCH_EMPLOYEES,
  FETCH_CUSTOMERS,
  LOADING,
  ERROR_RESPONSE,
  QUERY_EMPLOYEES,
  QUERY_CUSTOMERS,
} from "./types";
import { url } from "../../utils";

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

export const queryCustomers = (query: any) => {
  return {
    type: QUERY_CUSTOMERS,
    payload: query,
  };
};

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const errorResponse = (err: any) => {
  return {
    type: ERROR_RESPONSE,
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
        `${url}/api/employees`,
        config
      );
      const users = res.data.data;
      dispatch(fetchEmployees(users));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const searchEmployees = (id: string) => {
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
        `${url}/api/employees/search/${id}`,
        config
      );
      const users = res.data.data;
      dispatch(queryEmployees(users));
    } catch (err) {
      console.log(err.message);
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
        `${url}/api/customers`,
        config
      );
      const users = res.data.data;
      dispatch(fetchCustomers(users));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const searchCustomers = (id: string) => {
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
        `${url}/api/customers/search/${id}`,
        config
      );
      const users = res.data.data;
      dispatch(queryCustomers(users));
    } catch (err) {
      console.log(err.message);
    }
  };
};
