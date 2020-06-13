import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ACard from './ACard';
import {BASE_URL} from "../../utils/constants";
import axios from "axios";

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
			<Grid 
				container
				direction="row"
				justify="space-around"
				alignItems="center"
				style={{
					height: '24%'
				}}

				>
				<ACard type="Total Customer" value={this.state.total_customer}/>
				<ACard type="Total Open AR" value={this.state.total_open_ar}/>
				<ACard type="Average Days Delay" value={this.state.average_days_delay}/>
				<ACard type="Total Invoice Open" value={this.state.total_open_invoices}/>
				
          	</Grid>
		);
	};
}

export default Cards
