import { ADD_A_ROW, REMOVE_A_ROW, REMOVE_ALL_ROW } from "./rowDataType";

const initialState = {
	tableRows: {},
	size: 0
}



const rowDataReducer = (state=initialState, action) =>{
	switch(action.type){
		case ADD_A_ROW:{
			let data = state.tableRows;
			data[action.payload.pk_id] = action.payload;
			return{
				...state,
				tableRows: data,
				size: Object.keys(data).length
			}
		}
		case REMOVE_A_ROW:{
			let data = state.tableRows;
			delete data[action.payload];
			return{
				...state,
				tableRows: data,
				size: Object.keys(data).length
			}
		}
		case REMOVE_ALL_ROW:{
			return{
				...state,
				tableRows: {},
				size: 0
			}
		}
		default: return state
	}
}

export default rowDataReducer


