
import * as types from './../constants/ActionType';


var initialState = {
	txtName: '',
	checkStatus: -1,
};


var myReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FILTER_TABLE:
			return {
				txtName: action.filter.name,
				checkStatus: parseInt(action.filter.status, 10)
			}
		default: return state;
	}
}

export default myReducer;