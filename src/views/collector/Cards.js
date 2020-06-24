import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ACard from './ACard';
import {BASE_URL} from "../../utils/constants";
import axios from "axios";
import {connect} from 'react-redux';
import { removeBCode, addBCode } from '../../reducers';

const mapStateToProps = state => {
	return{
		businessCode: state.businessCodeS.businessCode,
		businessCodeEmpty: state.businessCodeS.empty
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  removeBCode: () => dispatch(removeBCode()),
	  addBCode: (payload) => dispatch(addBCode(payload))
	}
}

export class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total_customer:0,
			total_open_ar:0,
			average_days_delay:0,
			total_open_invoices:0
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevProps.businessCode !== this.props.businessCode){
			let url = BASE_URL+'card_details';
			if(!this.props.businessCodeEmpty){
				url += '?business_code='+this.props.businessCode;
			}
			axios(url)
			.then(
				response => {
					this.setState({
						total_customer: response.data.total_customer,
						total_open_ar: response.data.total_open_ar,
						average_days_delay: response.data.average_days_delay,
						total_open_invoices: response.data.total_open_invoices
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
		axios(BASE_URL+'card_details')
			.then(
				response => {
					this.setState({
						total_customer: response.data.total_customer,
						total_open_ar: response.data.total_open_ar,
						average_days_delay: response.data.average_days_delay,
						total_open_invoices: response.data.total_open_invoices
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
				direction="row"
				justify="space-around"
				alignItems="center"
				style={{
					height: '24%'
				}}

				>
				<ACard type="Total Customer" value={this.state.total_customer} initials="" useId="total-customers-text-collector"/>
				<ACard type="Total Open AR" value={this.state.total_open_ar} initials="money" useId="total-open-ar-text-collector"/>
				<ACard type="Average Days Delay" value={this.state.average_days_delay} initials="days" useId="average-days-delay-text-collector"/>
				<ACard type="Total Invoice Open" value={this.state.total_open_invoices} initials="" useId="total-open-invoice-text-collector"/>
				
          	</Grid>
		);
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
