import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import {connect} from 'react-redux';
import {BASE_URL} from "../../utils/constants";
import axios from "axios";

const mapStateToProps = state => {
	return{
		userNumber: state.userLogin.userNumber
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
	componentDidMount(){
		console.log(this.props.userNumber)
		axios(BASE_URL+'get_customer_name_by_customer_number?cs_number='+this.props.userNumber)
			.then(
				response => {
					this.setState({
						open_amount: response.data.open_amount,
						open_invoices: response.data.open_invoices
					})
					console.log(response.data)
				}
			).catch(
			error => {
				console.log(error)
			}
		)
	}

	render() {
		return (
			<Grid container
					style={{
						width:'30%',
						height:'100%',
						// border:"1px dotted red"
					}}
					direction="row"
					justify="space-between"
					alignItems="center"
					>
					<Grid container
						direction='column'
						alignItems='center'
						style={{
							// border:"1px dotted white",
							width:'50%',
							height:'100%'
						}}
					>	
						<Typography variant='h5' style={{color:"white"}}>
							{this.state.open_invoices}
						</Typography>
						<Typography variant='h6' style={{color:"white"}}>
							Total Open Invoices
						</Typography>
					</Grid>
					<Grid container
						direction='column'
						alignItems='center'
						style={{
							// border:"1px dotted white",
							width:'50%',
							height:'100%',
						}}
					>
						<Typography variant='h5' style={{color:"white"}}>
							${this.state.open_amount}
						</Typography>
						<Typography variant='h6' style={{color:"white"}}>
							Total Open Amount
						</Typography>
					</Grid>
				
			</Grid>
		)
	}
}

export default connect(mapStateToProps)(CounterLabels)