import { ADD_CUSTOMER_DATA, CLEAR_ALL } from "./customerQType";

const initialState = {
	tuples: []
}

const customerQReducer = (state=initialState, action) => {
	switch(action.type){
		case ADD_CUSTOMER_DATA:{
			return{
				...state,
				tuples: action.payload
			}
		}
		case CLEAR_ALL:{
			return{
				...state,
				tuples: []
			}
		}
		default: return state
	}
}

export default customerQReducer
