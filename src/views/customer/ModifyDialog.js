import React, { Component } from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent, Button, 
	Slide, InputLabel, Grid, TextField, Paper} from '@material-ui/core/';
import {connect} from 'react-redux';

import axios from 'axios';
import {BASE_URL} from "../../utils/constants";
import { markUpdate, removeAllRow } from "../../reducers";
import { withStyles } from "@material-ui/core/styles";

const mapStateToProps = state => {
	return{
		tableRows: state.rowDataReducer.tableRows,
		tableSize: state.rowDataReducer.size,
		updateCount: state.updateCounterReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  markUpdate: () => dispatch(markUpdate()),
	  removeAllRow: () => dispatch(removeAllRow())
	}
}

const styles = {
	input: {
	  color: "white"
	}
  };

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

export class ModifyDialog extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			open:false,
			open_amount: -1,
			doc_type:"-",
			original_open: -1,
			original_doc_type: "-",
			pk_id: 0
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.tableSize !== this.props.tableSize || prevProps.updateCount !== this.props.updateCount){
			if(this.props.tableSize === 1){
				let curr_data = this.props.tableRows
				for(let index in curr_data){
					this.setState({
						open_amount: curr_data[index].total_open_amount,
						doc_type: curr_data[index].doctype,
						original_open: curr_data[index].total_open_amount,
						original_doc_type: curr_data[index].doctype,
						pk_id: curr_data[index].pk_id
					})	
				}
			}
		}
	}

	updateData = () => {
		let url = BASE_URL + 'update_oa_dt_by_pk_id?pk_id='+this.state.pk_id+
		'&open_amount='+this.state.open_amount+
		'&doc_type='+this.state.doc_type;
		axios(url)
		.then(
			response => {
				this.setState({
					open: false
				})
				this.props.removeAllRow();
				this.props.markUpdate();
			}
		).catch(
			error => {
				this.setState({
					open: false,
					open_amount: this.state.original_open,
					doc_type: this.state.original_doc_type
				})
			}
		)
	}

	handleSave = (event) => {
		//console.log(`A: |${this.state.open_amount}| T:| ${this.state.doc_type}|`)
		let amt = this.state.open_amount;
		let dt = this.state.doc_type;
		if(amt === "" || dt === "" || amt < 0){
			this.setState({
				open_amount: this.state.original_open,
				doc_type: this.state.original_doc_type
			})
		}else if(amt === this.state.original_open && dt === this.state.original_doc_type){
			this.setState({
				open: false
			})
		}else{
			this.updateData();
			//console.log(this.state.pk_id);
		}
	};

	handleCancel = (event) => {
		this.setState({
			open: false,
			open_amount: this.state.original_open,
			doc_type: this.state.original_doc_type
		})
	}

	handleAmountChange = (event) =>{
		this.setState({
			open_amount: event.target.value
		})
	}

	handleDocTypeChange = (event) => {
		this.setState({
			doc_type: event.target.value
		})
	}

	render() {
		return (
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				maxWidth="xs"
				open={this.state.open}
				TransitionComponent={Transition}
				//onClose={this.handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				fullWidth={true}
			>
				<Paper variant="outlined" style={{backgroundColor:'#252C48', border:'1px solid white'}} >
					<DialogTitle id="alert-dialog-slide-title" style={{marginBottom:'10px', color:'white'}}>Modify</DialogTitle>
					<DialogContent  style={{marginBottom:'50px'}}>
						
						<Grid container direction="row" justify="center" style={{width:"100%"}}>
							<Grid item style={{width:"40%"}}>
								<InputLabel htmlFor="input-text" style={{alignItems:"center", color:'white'}}  >Open Amount</InputLabel>
							</Grid>
							<Grid item style={{width:"60%"}}>
								<TextField id="input-text"
									type={"number"}
									onChange={this.handleAmountChange}
									value={this.state.open_amount}
									style={{
										width:"100%"
									}}
									InputProps={{
										className: this.props.classes.input
									}}
									autoid="open-amount-input"
								/>
							</Grid>
						</Grid>
						<Grid container direction="row" justify="center" style={{width:"100%"}}>
							<Grid item style={{width:"40%"}}>
								<InputLabel htmlFor="doc-text" style={{alignItems:"center", color:'white'}}>Document Type</InputLabel>
							</Grid>
							<Grid item style={{width:"60%"}}>
								<TextField id="doc-text"
									onChange={this.handleDocTypeChange}
									value={this.state.doc_type}
									style={{
										width:"100%"
									}}
									InputProps={{
										className: this.props.classes.input
									}}
									autoid="doctype-input"
								/>
							</Grid>
						</Grid>
						
					</DialogContent>
					<DialogActions>
					<Button onClick={this.handleCancel} color="secondary" variant="outlined" autoid="modify-cancel-button">
						Cancel
					</Button>
					<Button onClick={this.handleSave} color="secondary" variant="contained" autoid="modify-save-button">
						Save
					</Button>
					</DialogActions>
				</Paper>
			</Dialog>
		)
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ModifyDialog))

// light: #252C48