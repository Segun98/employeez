import { combineReducers } from "redux";
import { count } from "./count";
import { Transaction } from "./transaction";

const allReducers = combineReducers({ Transaction, count });

export default allReducers;
