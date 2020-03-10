import React, {Component} from 'react';
import * as action from './../actions/index';
import { connect } from 'react-redux';

class Sort extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by : sortBy,
            value: sortValue
        })
    }

	render(){
		return (
           <div className="row mt-15">
               <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mt-10">
                   <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" 
                                onClick = { this.onClickSort } 
                                type="button" id="dropdownMenu1" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="true">
                            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                       </button>
                       <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                           <li onClick = { () => this.onClick('name' ,1 ) } >
                                <a role="button"> Tên A-Z
                                   <span className="fa fa-sort-alpha-asc pr-5">
                                   </span>
                               </a>
                           </li>
                           <li onClick = { () => this.onClick('name' ,-1 ) }>
                               <a role="button">  Tên Z-A
                                   <span className="fa fa-sort-alpha-desc pr-5">
                                   </span>
                               </a>
                           </li>
                           <li role="separator" className="divider"></li>
                           <li onClick = { () => this.onClick('status' ,1 ) }>
                            <a role="button">Trạng Thái Kích Hoạt</a></li>
                           <li onClick = { () => this.onClick('status' , -1 ) }><a role="button">Trạng Thái Ẩn</a></li>
                       </ul>
                   </div>
               </div>
           </div>
        );
	}
}

const mapStateToProps = (state) => {
    return {
        sort : state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(action.sortTask(sort));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Sort);
