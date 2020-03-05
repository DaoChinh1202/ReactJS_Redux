
import * as types from './../constants/ActionType';


var s4 = () => {
	return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4();
}
var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = data ? data : [];

var findIndex = (tasks,id) => {
	var result = -1;
	tasks.forEach((task,index) => {
	   if(task.id === id) {
		result = index;
	   }
	});
	return result;
}

var myReducer = (state = initialState, action) =>{
	switch(action.type){
		case types.LIST_ALL:
			return state;
		case types.ADD_TASK:
			var	newTask = {
				id : randomID(),
				name : action.task.txtName,
				status : action.task.checkStatus
				// status : action.task.checkStatus === 'true' ? true : false
			}
			console.log(action);
			state.push(newTask);
			localStorage.setItem('tasks',JSON.stringify(state))	;
			return [...state];
			/*copy ra 1 arr moi va tra ve*/
		case types.UPDATE_SATATUS_TASK: 
			console.log(action);
			var id = action.id
			var index = findIndex(state,id);
			state[index] = {
				...state[index],
				status : !state[index].status
			}; 
			localStorage.setItem('tasks',JSON.stringify(state))	;
			return [...state];	

		default: return state;
	}
}

export default myReducer;