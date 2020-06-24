import { MARK_UPDATE } from "./updateCounterType";

const initialState = {
	count: 0
}

const updateCounterReducer = (state=initialState, action) => {
	switch(action.type){
		case MARK_UPDATE:{
			return{
				...state,
				count: state.count + 1
			}
		}
		default: return state
	}
}

export default updateCounterReducer
