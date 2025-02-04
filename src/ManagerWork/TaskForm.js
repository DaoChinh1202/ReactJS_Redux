import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../actions/index';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            checkStatus: false,
        };
    }

    componentWillMount() {
        if (this.props.taskEdit) {
            this.setState({
                id: this.props.taskEdit.id,
                txtName: this.props.taskEdit.txtName,
                checkStatus: this.props.taskEdit.checkStatus,
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEdit) {
            this.setState({
                id: nextProps.taskEdit.id,
                txtName: nextProps.taskEdit.name,
                checkStatus: nextProps.taskEdit.status,
            });
        } else {
            this.onClear();
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'checkStatus') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        });
    }

    onSave = (event) => {
        event.preventDefault();

        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            txtName: '',
            checkStatus: false,
        });
    }

    render() {
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title" >
                        {this.state !== '' ? 'Update' : 'Add'}
                        <span className="" onClick={this.onCloseForm}><i className="fas fa-times-circle text-right"></i></span>

                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text" className="form-control" name="txtName" onChange={this.onChange} value={this.state.txtName} />
                        </div>
                        <label>Status :</label>
                        <select className="form-control" required="required" name="checkStatus" value={this.state.checkStatus} onChange={this.onChange}>
                            <option value={true}>Show</option>
                            <option value={false}>Hidden</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning" >Thêm</button>&nbsp;
                            <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEdit: state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(action.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(action.closeForm());
        }
    }
}

/*_ mapStateToProps : chuyển state từ store thành props của component
_ mapDispatchToProps : chuyển các action thành props.*/
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
