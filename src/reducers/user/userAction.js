import { ADD_USER, REMOVE_USER } from "./userType";


export const addUser = (param) => {
	return {
		type: ADD_USER,
		value: param
	}
}

export const removeUser = () => {
	return {
		type: REMOVE_USER
	}
}