import React, {Component} from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
import { findIndex } from 'lodash';
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing : null,
            fillter : {
                nameFil : '',
                statusFil : -1,
            },
            keySearch : '',
            bySortSearch: 'name',
            valueSortSearch: 1

        }
    }
    //goi khi reset
    componentWillMount(){
        /*console.log('componentWillMount');*/
        if(localStorage && localStorage.getItem('tasks')){
            var tasks =  JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }



   /* onGenerateData = () =>{
        var tasks = [
            {
               id : this.generateID() ,
               name : 'Lear React JS',
               status : true 
            },
            {
               id : this.generateID(),
               name : 'Lear React Native',
               status : false 
            },
             {
               id : this.generateID(),
               name : 'Lear English',
               status : true 
            },
        ];

        this.setState({
            tasks: tasks
        });
        /*localStorage.setItem('tasks',tasks);*/
        // localStorage.setItem('tasks',JSON.stringify(tasks));
    // } */

    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4();
    }

    onToggleForm = () =>{
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm :true,
                taskEditing: null  
            });
        }else{
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing: null
            });
    }
        
    }

    onCloseForm = () => {
         this.setState({
            isDisplayForm : false
        });
    }

    onShowForm = () =>{
         this.setState({
            isDisplayForm : true
        });
    }

    onSubmitTaskForm = (data) => {
        var {tasks} =  this.state; /*tasks = this.state.tasks*/
        
        if(data.id === ''){
            data.name = data.txtName;
            data.status = data.checkStatus;
            data.id = this.generateID();
            tasks.push(data);
        }else{
            data.name = data.txtName;
            data.status = data.checkStatus;
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
       
        this.setState({
            tasks : tasks,
            taskEditing: null
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
       /* var index = this.findIndex(id);*/
       /*use library*/
       var index = findIndex(tasks,(task) => {
            return task.id === id;
       });
        if(index !==  -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });

            localStorage.setItem('tasks', JSON.stringify(tasks)); 
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task,index) => {
           if(task.id === id) {
            result = index;
           }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !==  -1){
            tasks.splice(index,1)
            this.setState({
                tasks : tasks
            });

            localStorage.setItem('tasks', JSON.stringify(tasks)); 
        }
        this.onCloseForm();

    }

    onUpdateValue = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEdit = tasks[index];
        this.setState({
            taskEditing : taskEdit
        });
        this.onShowForm();

        // console.log(this.state.taskEditing)
    }

    

    onFillter = (nameFillter,fillterStatus) => {
       /* fillterStatus = parseInt(fillterStatus,10);*/
        fillterStatus = +fillterStatus;
        this.setState({
            fillter : {
                nameFil : nameFillter.toLowerCase(),
                statusFil : fillterStatus,
            }
        });
    }
    onSearch = (keyword) => {
        this.setState({
            keySearch : keyword
        })

    }

    onSort = (sortBy, sortValue) =>{
        this.setState({
           bySortSearch: sortBy,
           valueSortSearch: sortValue
        });
        console.log(sortBy,sortValue)
    }

	render(){
        var { tasks,isDisplayForm,taskEditing, fillter, keySearch, bySortSearch, valueSortSearch } = this.state;  // var tasks = this.state.tasks;

        if(fillter){
            if (fillter.nameFil) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(fillter.nameFil) !== -1;  
                });
            }
            tasks = tasks.filter((task) => {
                if(fillter.statusFil === -1){
                    return task;
                }else{
                    return task.status === (fillter.statusFil === 1 ? true : false)
                }
            });

        }

        if (keySearch) {
             tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(keySearch) !== -1;  
                });
        }

        console.log(bySortSearch, valueSortSearch);

        /*sort*/

        if(bySortSearch === 'name') {
            tasks.sort((a,b) => {
                if(a.name > b.name) return valueSortSearch;
                else if(a.name < b.name) return -valueSortSearch;
                else return 0;
            });
        }else{
            tasks.sort((a,b) => {
                if(a.status > b.status) return valueSortSearch;
                else if(a.status < b.status) return -valueSortSearch;
                else return 0;
            });
        }


        var elementTaskForm = isDisplayForm ? <TaskForm 
                                                onSubmitTaskForm={ this.onSubmitTaskForm}
                                                onCloseForm={this.onCloseForm }  taskEdit={taskEditing}
                                                /> : '';
		return (
		    <div className="container">
        <div className="text-center">
            <h1>Workflow Management</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={  isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
               {/* <TaskForm />*/}
               { elementTaskForm }
            </div>
            <div className= { isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary" onClick = { this.onToggleForm }>
                    <span className="fa fa-plus mr-5"></span>Add work
                </button>
              {/*  <button type="button" className="btn btn-danger ml-10" onClick={ this.onGenerateData }>
                    <span className="fa fa-plus mr-5"></span>Generate Data
                </button>*/}
               	<Control    onSearch = {this.onSearch } 
                            onSort = { this.onSort } 
                            bySortSearch = { bySortSearch } 
                            valueSortSearch ={ valueSortSearch } />
                <br />
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList 
                            onUpdateStatus = {this.onUpdateStatus}
                            onDelete = {this.onDelete } 
                            onUpdateValue = {this.onUpdateValue}
                            onFillter = {this.onFillter} 
                            />
                    </div>
                </div>
            </div>
        </div>
    </div>
  		);
	}
}
export default Index;
