import { ADD_B_CODE, REMOVE_B_CODE } from "./businessCodeType";

export const addBCode = (payload) => {
	return{
		type: ADD_B_CODE,
		payload: payload
	}
}

export const removeBCode = () => {
	return {
		type: REMOVE_B_CODE
	}
}