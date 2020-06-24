import { ADD_CUSTOMER_DATA, CLEAR_ALL } from "./customerQType";


export const addCustomerTuples = (payload) => {
	return{
		type: ADD_CUSTOMER_DATA,
		payload: payload
	}
}


export const clearAllTuples = () => {
	return{
		type: CLEAR_ALL
	}
}