import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from './../actions/index';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }


    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }


    onUpdateValue = () => {
        this.props.onEditTask(this.props.task);
        this.props.onOpenForm();
    }

    render() {
        var { task, index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status === true ? 'label label-danger' : 'label label-success '} onClick={this.onUpdateStatus}>
                        {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdateValue}>
                        <span className="fa fa-pencil mr-5"></span> Sửa
                        </button>
                    &nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span> Xóa
                        </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(action.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(action.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(action.closeForm());
        },
        onToggleForm: () => {
            dispatch(action.toggleForm());
        },
        onOpenForm: () => {
            dispatch(action.openForm());
        },
        onEditTask: (task) => {
            dispatch(action.updateTask(task));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
