import React, { Component } from 'react'
import { Grid, TextField, GridList,Typography, Button, TableContainer,TableRow, Table, TableHead, TableBody, TableCell} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import {BASE_URL} from "../../utils/constants";
import CustomerTuples from './CustomerTuples';

export class CustomerQueryPanel extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 cs_name:"",
			 customer_rows: []
		}
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		if((prevState.cs_name !== this.state.cs_name) && (this.state.cs_name.length > 0)){
			axios(BASE_URL+'customer_search_with_OA?cs_name='+this.state.cs_name)
				.then(
					response => {
						this.setState({
							customer_rows: response.data
						})
						//console.log(response.data)
					}
				).catch(
				error => {
					console.log(error)
				}
			)
		}
	}

	handleOnTextChange = (event) => {
		this.setState({
			cs_name: event.target.value
		})
	}

	render() {
		return (
			<Grid container
				direction='column'
				justify='space-between'
				alignItems='stretch'

				style={{
					backgroundColor: '#252C48',
					height:'50%',
					//border:'1px dotted white'
				}}
				>
				<Grid container 
					direction="row" 
					justify="flex-start"
					alignItems="center"
					style={{
						height:'25%',
						//border:'1px dotted red'
					}}
					>
					<Grid item 
						style={{
							width:'10%',
							color:'white'
						}}
						>
						<SearchIcon style={{
							padding:'5px'
						}} />
					</Grid>
					<Grid item 
						style={{
							width:'55%'
						}}
						>
						<TextField 
							label={<Typography style={{color:'white'}}>Enter Customer Name</Typography>}
							color="secondary"
							onChange={this.handleOnTextChange} />
					</Grid>
					<Grid item
						style={{
							width:'35%'
						}}
						>
						<Button variant="outlined" color="secondary">Advanced</Button>
					</Grid>
        		</Grid>
				
				<GridList container
					style={{
						//border:'1px solid red'
					}}
					>
					<TableContainer style={{width:'100%', height:'148px'}}>
						<Table stickyHeader aria-label="a dense table" size='small'>
							<TableHead>
								<TableRow >
									<TableCell style={{backgroundColor:'#1B1F38'}}>
										<Typography style={{fontSize:"10px", color:'white'}} >Customer Name</Typography>
									</TableCell>
									<TableCell style={{backgroundColor:'#1B1F38'}}>
										<Typography style={{fontSize:"10px", color:'white'}}>Customer Number</Typography>
									</TableCell>
									<TableCell style={{backgroundColor:'#1B1F38'}}>
										<Typography style={{fontSize:"10px", color:'white'}}>Open Amount</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.state.customer_rows.map(col => <CustomerTuples key={col.customer_number} tuple={col}/>)
								}
							</TableBody>
						</Table>
					</TableContainer>
				</GridList>
			</Grid>
		)
	}
}

export default CustomerQueryPanel
