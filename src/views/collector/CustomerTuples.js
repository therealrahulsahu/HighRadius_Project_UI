import React, { Component } from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';

import {addUser} from '../../reducers';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { removeAllFunction, clearAllTuples } from '../../reducers';

const mapStateToProps = state => {
	return{
		userNumber: state.userLogin.userNumber
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  addUser: (data) => dispatch(addUser(data)),
	  removeAllFunction: () => dispatch(removeAllFunction()),
	  clearAllTuples: () => dispatch(clearAllTuples())
	}
}

export class CustomerTuples extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			 customer_number:0
		}
	}
	
	componentDidMount(){
		this.setState({
			customer_number:this.props.tuple.customer_number
		})
	}
	
	handleRowClick = (event) => {
		this.props.addUser(this.state.customer_number);
		this.props.removeAllFunction();
		this.props.clearAllTuples();
		this.props.history.push('/customer-dashboard');
	}

	render() {
		return (
			<TableRow onClick={this.handleRowClick} style={{cursor:'pointer'}}>
				<TableCell style={{color:"white", backgroundColor:"#1B1F38"}}>
					<Typography style={{fontSize:"1.4vh", color:'white'}} >{this.props.tuple.customer_name}</Typography>
				</TableCell>
				<TableCell style={{color:"white", backgroundColor:"#1B1F38"}}>
					<Typography style={{fontSize:"1.4vh", color:'white'}} >{this.props.tuple.customer_number}</Typography>
				</TableCell>
				<TableCell style={{color:"white", backgroundColor:"#1B1F38"}}>
					<Typography style={{fontSize:"1.4vh", color:'white'}} >{this.props.tuple.open_amount}</Typography>
				</TableCell>
			</TableRow>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerTuples))
