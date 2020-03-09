import React, { Component } from 'react';
import TaskItem from './TaskItem';
import * as action from './../actions/index';
import { connect } from 'react-redux';
class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            filltertxtStatus: -1 // all - 1, active 1 , deactive 0
        }
    }


    onChangeFillter = (ev) => {
        var target = ev.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'nameFilter' ? value : this.state.nameFilter,
            status: name === 'filltertxtStatus' ? value : this.state.filltertxtStatus
        };

        this.props.onFilterTask(filter);

        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks, filterTable, keyword } = this.props;
        if (filterTable.txtName) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.txtName) !== -1;
            });
        }
        tasks = tasks.filter((task) => {
            if (filterTable.checkStatus === -1) {
                return task;
            } else {
                return task.status === (filterTable.checkStatus === 1 ? true : false)
            }
        });


        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        });


        var ElementTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
                onUpdateValue={this.props.onUpdateValue} />
        });
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" name="nameFilter" className="form-control" onChange={this.onChangeFillter} value={this.state.nameFilter} />
                        </td>
                        <td>
                            <select className="form-control" name="filltertxtStatus" onChange={this.onChangeFillter} value={this.state.filltertxtStatus} >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {ElementTasks}
                    {/* <TaskItem />*/}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTask: (filter) => {
            dispatch(action.filterTask(filter));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
