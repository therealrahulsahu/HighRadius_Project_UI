import { combineReducers } from "redux";
import userNumberReducer from "./user/userNumberReducer";
import predictionReducer from "./prediction/predictionReducer";
import customerQReducer from "./customerQuery/customerQReducer";
import businessCodeReducer from "./businessCodeS/businessCodeReducer";
import rowDataReducer from "./rowDataS/rowDataReducer";
import updateCounterReducer from "./updateCounter/updateCounterReducer";
import chatBotReducer from "./chatBox/chatBotReducer"



const rootReducer = combineReducers({
	userLogin: userNumberReducer,
	predStore: predictionReducer,
	customerQ: customerQReducer,
	businessCodeS: businessCodeReducer,
	rowDataReducer: rowDataReducer,
	updateCounterReducer: updateCounterReducer,
	chatBotReducer: chatBotReducer
})

export default rootReducer

