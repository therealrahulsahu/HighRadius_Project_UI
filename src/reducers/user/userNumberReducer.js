import { ADD_USER, REMOVE_USER } from "./userType";


const initialState = {
	userNumber: 0
}

const userNumberReducer = (state = initialState, action) => {
	switch(action.type){
		case ADD_USER: return{
			...state,
			userNumber: action.value
		}
		case REMOVE_USER: return{
			...state,
			userNumber: ""
		}
		default: return state
	}
}

export default userNumberReducer;