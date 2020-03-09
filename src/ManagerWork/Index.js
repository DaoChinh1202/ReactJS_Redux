import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
import { findIndex } from 'lodash';
import { connect } from 'react-redux';
import * as action from './../actions/index';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskEditing: null,
            keySearch: '',
            bySortSearch: 'name',
            valueSortSearch: 1

        }
    }



    onToggleForm = () => {
        var { itemEditing } = this.props;
        if (itemEditing && itemEditing.id !== '') {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            txtName: '',
            checkStatus: false,
        })
    }


    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }


    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }


    onUpdateValue = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEdit = tasks[index];
        this.setState({
            taskEditing: taskEdit
        });
        this.onShowForm();

        // console.log(this.state.taskEditing)
    }

    onSearch = (keyword) => {
        this.setState({
            keySearch: keyword
        })

    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            bySortSearch: sortBy,
            valueSortSearch: sortValue
        });
        console.log(sortBy, sortValue)
    }

    render() {
        var {  keySearch, bySortSearch, valueSortSearch } = this.state;  // var tasks = this.state.tasks;
        var { isDisplayForm } = this.props;


        // console.log(bySortSearch, valueSortSearch);

        // /*sort*/

        // if(bySortSearch === 'name') {
        //     tasks.sort((a,b) => {
        //         if(a.name > b.name) return valueSortSearch;
        //         else if(a.name < b.name) return -valueSortSearch;
        //         else return 0;
        //     });
        // }else{
        //     tasks.sort((a,b) => {
        //         if(a.status > b.status) return valueSortSearch;
        //         else if(a.status < b.status) return -valueSortSearch;
        //         else return 0;
        //     });
        // }

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Workflow Management</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <TaskForm />
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Add work
                        </button>
                        <Control onSearch={this.onSearch}
                            onSort={this.onSort}
                            bySortSearch={bySortSearch}
                            valueSortSearch={valueSortSearch} />
                        <br />
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(action.toggleForm());
        },
        onOpenForm: () => {
            dispatch(action.openForm());
        },
        onClearTask: (task) => {
            dispatch(action.updateTask(task));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
