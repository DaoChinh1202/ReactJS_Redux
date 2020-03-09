import React, {Component} from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {

	render(){
		return (
             <div className="row mt-15">
                <Search />
                <Sort 	
            		onSort = { this.props.onSort } 
            		bySortSearch = { this.props.bySortSearch } 
            		valueSortSearch = {this.props.valueSortSearch} 
        		/>
            </div>
        );
	}
}
export default Control;
