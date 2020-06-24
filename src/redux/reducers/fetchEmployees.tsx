import {FETCH_EMPLOYEES, LOADING, ERROR_RESPONSE, QUERY_EMPLOYEES } from "../actions/types"

const initialState = {
  loading: false,
  result: [],
  error: ""
}

export const Employees = (state= initialState, action: any) => {
  switch (action.type) {
    case LOADING:
      return {
        loading : true,
        result: [],
        error: ""
      }
    case FETCH_EMPLOYEES:
      return {
        loading : false,
        result: action.payload,
        error: ""
      }
      case QUERY_EMPLOYEES:
      return {
        loading : false,
        result: action.payload,
        error: ""
      }
      case ERROR_RESPONSE:
      return {
        loading : false,
        result: [],
        error: action.payload
      }
    default:
      return state;
  }
};
