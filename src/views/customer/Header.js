import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Freda from '../../assets/FredaButton.png';
import { removeUser } from '../../reducers';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {BASE_URL} from "../../utils/constants";
import axios from "axios";


const mapStateToProps = state => {
	return{
		userNumber: state.userLogin.userNumber
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  removeUser: () => dispatch(removeUser())
	}
}

export class Header extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			cs_number: this.props.userNumber,
			cs_name:  0
		}
	}
	
	componentDidMount(){
		//console.log(this.state.cs_number)
		axios(BASE_URL+'get_customer_name_by_customer_number?cs_number='+this.state.cs_number)
			.then(
				response => {
					this.setState({
						cs_name: response.data.customer_name
					})
					//console.log(response.data)
				}
			).catch(
			error => {
				console.log(error)
			}
		)
	}

	handleBackButton = (event) => {
		this.props.removeUser();
		this.props.history.push('/');
	}
	
	render() {
		return (
			<Grid container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					height:"10%",
					width:'100%'
					// border:"1px dotted white"
				  }}
				>
				<Grid container
					direction="row"
					style={{
						width:"40%",
						height:"100%"
					}}>
					<Grid container
						style={{
							// border:'1px solid white',
							height:'100%',
							width:'30%'
							}}>
						<ArrowBackIcon onClick={this.handleBackButton} style={{height:'90%', width:'90%', color:'red', cursor:'pointer'}}/>
					</Grid>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
						style={{
							height:'100%',
							// border:'1px solid white',
							width:'69%'
						}}
						>
						<Typography variant='h5' 
							style={{
								color:'white',
								height:'40%'
							}}
							>{this.state.cs_name}</Typography>
						<Typography variant='h6'
							style={{
								color:'white',
								height:'60%'
							}}
							>{this.props.userNumber}</Typography>
					</Grid>
				</Grid>
				
				<Grid container
					direction='row'
					justify='center'
					alignItems='center'
					style={{
						width:"15%",
						height:"100%",
						//border:'1px solid yellow'
					}}
					>
					<Button><img src={Freda} alt="#####"/></Button>
				</Grid>

			</Grid>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))