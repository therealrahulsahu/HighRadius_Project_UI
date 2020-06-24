import { ADD_B_CODE, REMOVE_B_CODE } from "./businessCodeType";

const initialState = {
	empty: true,
	businessCode: ""
}



const businessCodeReducer = (state=initialState, action) => {
	switch(action.type){
		case ADD_B_CODE: return{
			...state,
			empty: false,
			businessCode: action.payload
		}
		case REMOVE_B_CODE: return{
			...state,
			empty: true,
			businessCode: ""
		}
		default : return state
	}
}

export default businessCodeReducer
