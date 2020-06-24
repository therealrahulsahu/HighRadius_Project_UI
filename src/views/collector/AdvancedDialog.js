import React, { Component } from 'react';
import {DialogActions, DialogTitle, DialogContent, Button, Popper, Typography,
	Select, InputLabel, MenuItem, Grid, TextField, Paper} from '@material-ui/core/';
import {connect} from 'react-redux';
import { addCustomerTuples, clearAllTuples } from '../../reducers';
import axios from 'axios';
import {BASE_URL} from "../../utils/constants";
import { withStyles } from "@material-ui/core/styles";

const styles = {
	input: {
	  color: "white"
	}
  };

const mapStateToProps = state => {
	return{
		customerTuples: state.customerQ.tuples
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  addCustomerTuples: (payload) => dispatch(addCustomerTuples(payload)),
	  clearAllTuples: () => dispatch(clearAllTuples())
	}
}

export class AdvancedDialog extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			amount: 0,
			compare: 'm',
			open:false,
			anchor: null
		}
	}

	API_CallByCompare = (use_compare, amount) => {
		axios(BASE_URL+'customer_search_with_OA?by_cs_name=false&use_compare='+use_compare+'&amount='+amount)
		.then(
			response => {
				this.props.addCustomerTuples(response.data);
			}
		).catch(
			error => {
				console.log(error)
			}
		)
	}

	getPlaceholderText = (code, amount) => {
		let text = "Customers with Open Amount "
		if(code === 'm'){
			text+=">";
		}else if(code === "l"){
			text+="<";
		}else if(code === "me"){
			text+=">=";
		}else if(code === "le"){
			text+="<=";
		}else if(code === "ne"){
			text+="!=";
		}else{
			text+="=";
		}
		return text+" $"+amount;
	}

	handleSearch = (event) => {
		if(this.state.amount === 0 || this.state.amount === ""){
			
		}else{
			this.API_CallByCompare(this.state.compare, this.state.amount);
			this.props.place_holder(this.getPlaceholderText(this.state.compare, this.state.amount));
			this.setState({
				open: false,
				amount: 0,
				compare: 'm'
			})
		}
	};

	handleCancel = (event) => {
		this.setState({
			open: false,
			amount: 0,
			compare:'m'
		})
	}

	handleCompare = (event) => {
		this.setState({
			compare: event.target.value
		})
	}

	handleAmount = (event) => {
		this.setState({
			amount: event.target.value
		})
	}

	render() {
		return (
			<Popper
				open={this.state.open}
				onClose={this.handleClose}
				anchorEl={this.state.anchor}
				placement='bottom-end'
			>
				<Paper variant="outlined" 
					style={{
						overflow:'auto',
						width:'30vw',
						backgroundColor:'#252C48',
						height:'30vh',
						marginTop:'2px'
						//border:'1px solid white'
						}}>
					<Grid container>
						<DialogTitle id="alert-dialog-slide-title" style={{color:'white', height:'1vh', marginBottom:'5px'}}>
							<Typography>Advanced Search</Typography>
						</DialogTitle>
						<DialogContent >
							<Grid container direction="row" justify="center" style={{width:"55vh"}}>
								<Grid item style={{width:"40%"}}>
									<InputLabel htmlFor="max-width" style={{color: 'white'}}>Amount Is</InputLabel>
								</Grid>
								<Grid item style={{width:"60%"}}>
									<Select
										//style={{marginLeft:"50px"}}
										style={{
											width:"100%",
											color:"white"
										}}
										onChange={this.handleCompare}
										value={this.state.compare}
										id='max-width'
										size='small'
										autoid="advance-search-drop-down"
									>
										<MenuItem value={'m'}>More Than</MenuItem>
										<MenuItem value={'l'}>Less Than</MenuItem>
										<MenuItem value={'me'}>More or Equal To</MenuItem>
										<MenuItem value={'le'}>Less or Equal To</MenuItem>
										<MenuItem value={'ne'}>Not Equal</MenuItem>
									</Select>
								</Grid>
							</Grid>
							<Grid container direction="row" justify="center" style={{width:"55vh"}}>
								<Grid item style={{width:"40%"}}>
									<InputLabel htmlFor="input-text" style={{alignItems:"center", color: 'white'}} >Open Amount</InputLabel>
								</Grid>
								<Grid item style={{width:"60%"}}>
									<TextField id="input-text"
										type={"number"}
										onChange={this.handleAmount}
										style={{
											width:"100%"
										}}
										size='small'
										InputProps={{
											className: this.props.classes.input
										}}
										placeholder="Enter Amount"
										autoid="advance-search-open-amount"
									/>
								</Grid>
							</Grid>
							<Grid container direction="row" justify="flex-end" style={{width:"55vh"}}>
								<DialogActions>
									<Button onClick={this.handleCancel} color="secondary" variant="outlined" autoid="advance-search-cancel">
										Cancel
									</Button>
									<Button onClick={this.handleSearch} color="secondary" variant="contained" autoid="advance-search-button">
										Search
									</Button>
								</DialogActions>
							</Grid>
							
						</DialogContent>
					</Grid>
					
				</Paper>
			</Popper>
		)
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(AdvancedDialog))
