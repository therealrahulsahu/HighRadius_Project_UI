import React, { Component } from 'react'
import { Grid, Typography, TableContainer,TableRow, 
	Table, TableHead, TableBody, TableCell, Input} from '@material-ui/core';
import axios from 'axios';
import {BASE_URL} from "../../utils/constants";
import CustomerTuples from './CustomerTuples';
import AdvancedDialog from './AdvancedDialog';
import {connect} from 'react-redux';
import { addCustomerTuples, clearAllTuples } from '../../reducers';
import searchIcon from "../../assets/mag-glass.svg";
import dollar from "../../assets/attach_money.svg";


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


export class CustomerQueryPanel extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			cs_name:"",
			customer_rows: [],
			place_v: "Serach Customers by customer Name or Number"
		}
		this.dialog_ref = React.createRef();
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevState.cs_name !== this.state.cs_name){
			axios(BASE_URL+'customer_search_with_OA?by_cs_name=true&cs_name='+this.state.cs_name)
				.then(
					response => {
						this.props.addCustomerTuples(response.data);
						//console.log(response.data)
					}
				).catch(
				error => {
					console.log(error)
				}
			)
		}
	}

	componentDidMount() {
		axios(BASE_URL+'customer_search_with_OA?by_cs_name=true&cs_name=')
				.then(
					response => {
						this.props.addCustomerTuples(response.data);
						//console.log(response.data)
					}
				).catch(
				error => {
					console.log(error)
				}
			)
	}

	handleOnTextChange = (event) => {
		this.setState({
			cs_name: event.target.value,
			place_v: "Serach Customers by customer Name or Number"
		})
	}

	handleDialogOpen = (event) => {
		this.dialog_ref.current.setState({
			open: ! this.dialog_ref.current.state.open,
			amount:0,
			compare:true,
			anchor: event.currentTarget
		})
	}

	render() {
		return (
			<Grid container
				direction='column'
				justify='flex-start'
				alignItems='stretch'

				style={{
					backgroundColor: '#252C48',
					height:'50%',
					//border:'1px dotted white'
				}}
				>
				<Grid container item wrap="nowrap" style={{border:'1px solid #33DCFF',borderRadius:'50px'}}>
					<img
						src={searchIcon}
						alt=""
						style={{ width: "4.5vh", height: "auto", marginRight: "1vw" }}
					/>
					<Input
						type="search"
						style={{ color: "white", fontSize: "1.5vh" }}
						disableUnderline
						fullWidth
						placeholder={this.state.place_v}
						onChange={this.handleOnTextChange}
						autoid="search-text-field"
					/>
					<img src={dollar} alt="" onClick={this.handleDialogOpen} style={{cursor:'pointer', width:"4.5vh", height:"auto"}} autoid="search-icon"/>
					<AdvancedDialog ref={this.dialog_ref} place_holder={this.changePlaceholder}/>
				</Grid>
				
				<Grid container
					style={{
						//border:'1px solid red'
					}}
					>
					<TableContainer style={{width:'30vw', height:'27vh', zIndex:0}} autoid="advance-search-table">
						<Table stickyHeader aria-label="a dense table" size='small'>
							<TableHead>
								<TableRow >
									<TableCell style={{backgroundColor:'#1B1F38'}}>
										<Typography style={{fontSize:"1.5vh", color:'white'}} >Customer Name</Typography>
									</TableCell>
									<TableCell style={{backgroundColor:'#1B1F38'}}>
										<Typography style={{fontSize:"1.5vh", color:'white'}}>Customer Number</Typography>
									</TableCell>
									<TableCell style={{backgroundColor:'#1B1F38'}}>
										<Typography style={{fontSize:"1.5vh", color:'white'}}>Open Amount</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.props.customerTuples.map(col => <CustomerTuples key={col.customer_number} tuple={col}/>)
								}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		)
	}

	changePlaceholder = (text) => {
		this.setState({
			place_v: text
		})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerQueryPanel)
