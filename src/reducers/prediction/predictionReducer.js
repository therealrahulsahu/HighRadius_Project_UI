import { ADD_FUNCTION, REMOVE_ALL_FUNCTION, REMOVE_FUNCTION, CALL_ALL_FUNCTION } from "./predictionType";

const initialState = {
	predFunctions: {},
	size: 0
}

const predictionReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_FUNCTION:{
			let data = state.predFunctions;
			data[action.id] = action.function;
			return{
				...state,
				predFunctions: data,
				size: Object.keys(data).length
			}
		}
		case REMOVE_FUNCTION:{
			let data = state.predFunctions;
			delete data[action.id];
			return{
				...state,
				predFunctions: data,
				size: Object.keys(data).length
			}
		}
		case REMOVE_ALL_FUNCTION:{
			return{
				...state,
				predFunctions:{},
				size:0
			}
		}
		case CALL_ALL_FUNCTION:{
			for(let index in state.predFunctions){
				state.predFunctions[index]();
			}
			return state
		}
		default: return state
	}
}

export default predictionReducer