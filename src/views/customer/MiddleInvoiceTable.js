import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination';
import MyTable from "./MyTable";
import {BASE_URL} from "../../utils/constants";
import {connect} from 'react-redux';
import { addARow, removeARow, removeAllRow } from "../../reducers";
import { markUpdate } from "../../reducers";

const mapStateToProps = state => {
	return{
		userNumber: state.userLogin.userNumber,
		updateCount: state.updateCounterReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
      addARow: payload => dispatch(addARow(payload)),
      removeARow: payload => dispatch(removeARow(payload)),
	  removeAllRow: () => dispatch(removeAllRow()),
	  markUpdate: () => dispatch(markUpdate())
	}
}

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
	{id:"invoice_amount_doc_currency", name: "Invoice Currency", minWidth: 110}
]

export class MiddleInvoiceTable extends Component {
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
		if(this.props.userNumber > 0){
			if(prevState.limit!==this.state.limit || prevState.offset!==this.state.offset || prevProps.updateCount !==this.props.updateCount){
				//console.log(''+this.state.limit+' '+this.state.offset)
				let url = BASE_URL+'user_open_invoice_fetch_by_limit_and_offset?limit=' + 
				this.state.limit+'&offset='+(this.state.limit * this.state.offset)+
				"&cs_number="+this.props.userNumber+"&by_CN=true";
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
			}
		}
	}


	componentDidMount() {
		//console.log(this.state.limit)
		if(this.props.userNumber > 0){
			let url = BASE_URL+'user_open_invoice_fetch_by_limit_and_offset?limit='+
			this.state.limit+'&offset='+(this.state.limit * this.state.offset)+"&cs_number="+
			this.props.userNumber+"&by_CN=true";
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
			let url2 = BASE_URL+'all_open_invoices?cs_number='+this.props.userNumber+"&by_CN=true";
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

	render() {
		return (
			<Grid
				container
				direction='column'
				alignItems='stretch'
				style={{
				backgroundColor:'#252C48',
				height:'83%',
				//border:'3px solid #252C48',
				width:'100%'
			}}>
				<Grid container
					style={{
						overflow:'auto',
						width:'100%',
						height:'66vh',
						//border:'1px solid red'
					}}
				>

					<MyTable columns={columnNames} row_data={this.state.tuples} ref={this.table_ref} />

				</Grid>
				<Grid container
					justify='flex-end'
					style={{
						//height:'10%',
						//border:'1px solid white'
					}}
				>
					<TablePagination style={{float:'right', color:'white'}}
						count={this.state.total_data}
						rowsPerPage={this.state.limit}
						page={this.state.offset}
						component="div" 
						onChangeRowsPerPage={this.handleRowPerPageChange}
						onChangePage={this.handleOnPageChange}
						rowsPerPageOptions={[10, 25, 100, 500, 1000, 5000]}
						autoid="invoice-table-pagination-customer"
					/>
				</Grid>

			</Grid>
		)
	}

	handleOnPageChange = (event, newPage) => {
		this.setState({
			offset: newPage
		})
		this.props.removeAllRow();
		this.table_ref.current.setState({
			checkboxChe: false
		})
	}

	handleRowPerPageChange = event => {
		this.setState({
			limit: event.target.value
		});
		this.props.removeAllRow();
		this.table_ref.current.setState({
			checkboxChe: false
		})
		this.props.markUpdate();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleInvoiceTable)