import { combineReducers } from "redux";
import userNumberReducer from "./user/userNumberReducer";

const rootReducer = combineReducers({
	userLogin: userNumberReducer
})

export default rootReducer

