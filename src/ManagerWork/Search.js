import React, { Component } from 'react';
import * as action from './../actions/index';
import { connect } from 'react-redux';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keySearch: ''
        }
    }
    onChange = (ev) => {
        var target = ev.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSearch = () => {
        this.props.onSearchKey(this.state.keySearch)
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mt-10">
                <div className="input-group">
                    <input name="keySearch"
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        value={this.state.keySearch}
                        onChange={this.onChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                            <span className="fa fa-search mr-5"></span>Tìm
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearchKey: (keySearch) => {
            dispatch(action.searchTask(keySearch));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);
