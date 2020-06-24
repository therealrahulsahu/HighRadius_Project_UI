import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import {connect} from 'react-redux';
import {BASE_URL} from "../../utils/constants";
import axios from "axios";

const mapStateToProps = state => {
	return{
		userNumber: state.userLogin.userNumber,
		updateCount: state.updateCounterReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export class CounterLabels extends Component {
	constructor(props){
		super(props)
		this.state = {
			open_amount:0,
			open_invoices:0
		}
	}
	nameQuery = () => {
		axios(BASE_URL+'get_customer_name_by_customer_number?cs_number='+this.props.userNumber)
			.then(
				response => {
					this.setState({
						open_amount: response.data.open_amount,
						open_invoices: response.data.open_invoices
					})
					//console.log(response.data)
				}
			).catch(
			error => {
				console.log(error)
			}
		)
	}
	componentDidMount(){
		//console.log(this.props.userNumber)
		this.nameQuery();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.updateCount !== this.props.updateCount){
			this.nameQuery();
		}
	}

	render() {
		return (
			<Grid container
					style={{
						width:'50vw',
						height:'100%',
						// border:"1px dotted red"
					}}
					direction="row"
					justify="flex-end"
					alignItems="center"
					>
					<Grid container
						direction='column'
						alignItems='center'
						justify='center'
						style={{
							// border:"1px dotted white",
							width:'15vw',
							height:'100%'
						}}
					>	
						<Typography style={{color:"white", fontSize:'1.5vw'}} autoid="total-open-invoices-customer">
							{this.state.open_invoices}
						</Typography>
						<Typography style={{color:"white", fontSize:'1.5vw'}}>
							Total Open Invoices
						</Typography>
					</Grid>
					<Grid container
						direction='column'
						alignItems='center'
						justify='center'
						style={{
							// border:"1px dotted white",
							width:'15vw',
							height:'100%',
						}}
					>
						<Typography  style={{color:"white", fontSize:'1.5vw'}} autoid="total-open-amount-customer">
							${this.state.open_amount}
						</Typography>
						<Typography style={{color:"white", fontSize:'1.5vw'}}>
							Total Open Amount
						</Typography>
					</Grid>
				
			</Grid>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterLabels)