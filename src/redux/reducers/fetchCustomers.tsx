import {FETCH_CUSTOMERS, LOADING, ERROR } from "../actions/types"

const initialState = {
  loading: false,
  result: [],
  error: ""
}

export const Customers = (state= initialState, action: any) => {
  switch (action.type) {
    case LOADING:
      return {
        loading : true,
        result: [],
        error: ""
      }
    case FETCH_CUSTOMERS:
      return {
        loading : false,
        result: action.payload,
        error: ""
      }
      case ERROR:
      return {
        loading : false,
        result: [],
        error: action.payload
      }
    default:
      return state;
  }
};
