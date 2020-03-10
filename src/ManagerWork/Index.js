import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import * as action from './../actions/index';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskEditing: null,
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

    onUpdateValue = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEdit = tasks[index];
        this.setState({
            taskEditing: taskEdit
        });
        this.onShowForm();
    }

    onSearch = (keyword) => {
        this.setState({
            keySearch: keyword
        })

    }

    render() {
        var { isDisplayForm } = this.props;
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
                        <Control />
                        <br />
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />
                            </div>
                        </div>
                    </div>
                </div>
                <span className= "copyright">© Copyrigh chinhcn</span>
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
