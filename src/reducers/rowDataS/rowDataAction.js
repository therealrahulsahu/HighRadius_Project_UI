import { ADD_A_ROW, REMOVE_A_ROW, REMOVE_ALL_ROW } from "./rowDataType";

export const addARow = (payload) =>{
	return{
		type: ADD_A_ROW,
		payload: payload
	}
}

export const removeARow = (payload) => {
	return{
		type: REMOVE_A_ROW,
		payload: payload
	}
}

export const removeAllRow = () => {
	return{
		type: REMOVE_ALL_ROW
	}
}
