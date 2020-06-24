import { ADD_MESSAGE, REMOVE_ALL_MESSAGE } from "./chatBotType";

const initialState = {
	messages: ['Hi, how can I help you?'],
	count: 1
}

export const chatBotReducer = (state=initialState, action) => {
	switch(action.type){
		case ADD_MESSAGE: {
			let mess = state.messages;
			mess.push(action.payload);
			return{
				...state,
				messages: mess,
				count: mess.length
			}
		}
		case REMOVE_ALL_MESSAGE: {
			return{
				...state,
				messages: ['Hi, how can I help you?'],
				count: 1
			}
		}
		default: return state
	}
}

export default chatBotReducer
