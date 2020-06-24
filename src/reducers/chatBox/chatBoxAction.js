import { ADD_MESSAGE, REMOVE_ALL_MESSAGE } from "./chatBotType";


export const addMessage = (payload) => {
	return{
		type: ADD_MESSAGE,
		payload: payload
	}
}

export const removeAllMessage = () => {
	return{
		type: REMOVE_ALL_MESSAGE
	}
}