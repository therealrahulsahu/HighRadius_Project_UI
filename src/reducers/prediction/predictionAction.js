import { ADD_FUNCTION, REMOVE_ALL_FUNCTION, REMOVE_FUNCTION, CALL_ALL_FUNCTION } from "./predictionType";

export const addFunction = (pk_id, func) => {
	return{
		type: ADD_FUNCTION,
		id: pk_id,
		function: func
	}
}

export const removeFunction = (pk_id) => {
	return{
		type: REMOVE_FUNCTION,
		id: pk_id
	}
}

export const removeAllFunction = () => {
	return{
		type: REMOVE_ALL_FUNCTION
	}
}

export const callAllFunction = () => {
	return{
		type: CALL_ALL_FUNCTION
	}
}