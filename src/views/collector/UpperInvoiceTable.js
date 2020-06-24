import React, { Component } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'

import {connect} from 'react-redux';
import { callAllFunction } from '../../reducers';

const mapStateToProps = state => {
	return{
		predFunctions: state.predStore.predFunctions,
		functionsCount: state.predStore.size
	}
}

const mapDispatchToProps = dispatch => {
	return {
      callAllFunction: () => dispatch(callAllFunction())
	}
}

export class UpperInvoiceTable extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			disableButton: true
		}
	}
	
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.functionsCount !== this.props.functionsCount){
			if(Object.keys(this.props.predFunctions).length > 0){
				this.setState({
					disableButton: false
				})
			}else{
				this.setState({
					disableButton: true
				})
			}
		}
	}

	handlePrediction = () => {
		this.props.callAllFunction();
	}

	render() {
		
		return (
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					backgroundColor:'#252C48',
					height:'13%',
					// border:'1px solid red'
				}}
				>
				<Grid container
					justify='flex-start'
					alignItems="center"
					style={{
						paddingLeft:'10px',
						width:'30%',
						// border:'1px solid white'
					}}
					>
					<Typography 
						style={{
							color:'white',
							fontSize:'3.5vh'
						}}
					>Invoices</Typography>
				</Grid>
				<Grid container
					alignItems='center'
					justify='flex-end'
					style={{
						paddingRight:'10px',
						width:'30%',
						// border:'1px solid yellow'
					}}
					>
					<Button 
						style={{
							height:'70%'
						}}
						disabled={this.state.disableButton}
						variant="contained"
						color="secondary"
						onClick={this.handlePrediction}
						autoid="predict-button"
					>
						Predict
					</Button>
				</Grid>
			</Grid>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpperInvoiceTable)
