import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination';
import MyTable from "./MyTable";
import {BASE_URL} from "../../utils/constants";
import {connect} from 'react-redux';
import { removeAllFunction } from '../../reducers';
import { markUpdate } from "../../reducers";

const columnNames = [
	{id:"company_id", name:"Company Id", minWidth: 80},
	{id:"acct_doc_header_id", name: "Acct Doc Header Id", minWidth: 130},
	{id:"document_number", name: "Documents Number", minWidth: 130},
	{id:"business_code", name: "Business Code", minWidth: 100},
	{id:"doctype", name: "Document Type", minWidth: 100},
	{id:"customer_number", name: "Customer Number", minWidth: 120},
	{id:"fk_customer_map_id", name: "Customer Map ID", minWidth: 120},
	{id:"customer_name", name: "Name Of Customer", minWidth: 250},
	{id:"document_create_date", name: "Document Create Date", minWidth: 150},
	{id:"baseline_create_date", name: "Baseline Date", minWidth: 100},
	{id:"invoice_date_norm", name: "Invoice Date", minWidth: 100},
	{id:"invoice_id", name: "Invoice ID", minWidth: 100},
	{id:"total_open_amount", name: "Total Open Amount", minWidth: 130},
	{id:"cust_payment_terms", name: "Customer Payment Terms", minWidth: 170},
	{id:"clearing_date", name: "Clear Date", minWidth: 100},
	{id:"isopen", name: "Is Open Invoice", minWidth: 100},
	{id:"ship_date", name: "Shipping Date", minWidth: 100},
	{id:"paid_amount", name: "Payment Amount", minWidth: 110},
	{id:"dayspast_due", name: "Days past Due date", minWidth: 130},
	{id:"document_id", name: "Doc Id", minWidth: 100},
	{id:"document_creation_date", name: "Document Create Date", minWidth: 150},
	{id:"actual_open_amount", name: "Actual Amount Outstanding", minWidth: 200},
	{id:"invoice_age", name: "Age of Invoice", minWidth: 100},
	{id:"invoice_amount_doc_currency", name: "Invoice Currency", minWidth: 110},
	{id:"predicted_payment_type", name: "Predicted Payment Type", minWidth: 160},
	{id:"predicted_amount", name: "Predicted_amount", minWidth: 100}
]


const mapStateToProps = state => {
	return{
		predFunctions: state.predStore.predFunctions,
		businessCode: state.businessCodeS.businessCode,
		businessCodeEmpty: state.businessCodeS.empty,
        updateCount: state.updateCounterReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  removeAllFunction: () => dispatch(removeAllFunction()),
	  markUpdate: () => dispatch(markUpdate())
	}
}


export class MiddleInvoiceTable extends Component {
	result;
	tuple;
	output;
	constructor(props) {
		super(props);
		this.state = {
			tuples:[],
			offset:0,
			limit:10,
			total_data:0
		}

		this.table_ref = React.createRef();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevState.limit!==this.state.limit || prevState.offset!==this.state.offset || prevProps.businessCode!==this.props.businessCode){
			//console.log(''+this.state.limit+' '+this.state.offset)
			let url = BASE_URL+'user_open_invoice_fetch_by_limit_and_offset?limit='+
			this.state.limit+'&offset='+(this.state.limit * this.state.offset);
			if(!this.props.businessCodeEmpty){
				url += '&by_CN=false&business_code='+this.props.businessCode;
			}
			axios(url)
				.then(
					response => {
						this.setState({
							tuples: response.data
						})
						//console.log(response.data)
					}
				).catch(
				error => {
					console.log(error)
				}
			)
			let url2 = BASE_URL+'all_open_invoices'; 
			if(!this.props.businessCodeEmpty){
				url2 += '?by_CN=false&business_code='+this.props.businessCode;
			}
			axios(url2)
			.then(
				response => {
					this.setState({
						total_data: response.data.open_invoices
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


	componentDidMount() {
		//console.log(this.state.limit)
		let url = BASE_URL+'user_open_invoice_fetch_by_limit_and_offset?limit='+
		this.state.limit+'&offset='+(this.state.limit * this.state.offset)
		axios(url)
		.then(
			response => {
				this.setState({
					tuples: response.data
				})
				//console.log(response.data)
			})
		.catch(
			error => {
				console.log(error)
			}
		)
		axios(BASE_URL+'all_open_invoices')
			.then(
				response => {
					this.setState({
						total_data: response.data.open_invoices
					})
					//console.log(response.data)
				}
			).catch(
			error => {
				console.log(error)
			}
		)
	}

	
	render() {
		return (
			<Grid
				container
				direction='column'
				justify="flex-start"
				alignItems='stretch'
				style={{
				backgroundColor:'#252C48',
				height:'87%',
				border:'3px solid #252C48',
				width:'100%'
			}}>
				<Grid container
					style={{
						overflow:'auto',
						width:'100%',
						height:'49vh',
						//border:'1px solid red'
					}}
				>

					<MyTable columns={columnNames} row_data={this.state} ref={this.table_ref} />

				</Grid>
				<Grid item
					style={{
						height:'2vh',
						//border:'1px solid white'
					}}
				>
					<TablePagination style={{float:'right', color:'white', height:'9vh', border:'0px'}}
						count={this.state.total_data}
						rowsPerPage={this.state.limit}
					 	page={this.state.offset}
						onChangeRowsPerPage={this.handleRowPerPageChange}
						onChangePage={this.handleOnPageChange}
						component="div" 
						autoid="invoice-table-pagination-collector"
					/>
				</Grid>

			</Grid>
		)
	}

	handleOnPageChange = (event, newPage) => {
		this.setState({
			offset: newPage
		})
		this.props.removeAllFunction();
		console.log(this.table_ref.current)
		this.table_ref.current.setState({
			selectAllCheckbox:false
		})
	}

	handleRowPerPageChange = event => {
		this.setState({
			limit: event.target.value
		});
		this.props.removeAllFunction();
		this.table_ref.current.setState({
			selectAllCheckbox:false
		})
		this.props.markUpdate();
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MiddleInvoiceTable)