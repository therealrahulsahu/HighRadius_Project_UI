import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import UpperTable from './UpperTable';
import MiddleInvoiceTable from './MiddleInvoiceTable';

export class CustomerTable extends Component {
	render() {
		return (
			<Grid container
				direction="column"
				justify="space-between"
				alignItems="stretch"
				style={{
				height:"90%",
				width:"100%",
				//border:"1px solid white"
			}}
			  >
				<UpperTable/>
				<MiddleInvoiceTable/>
				
			</Grid>
		)
	}
}

export default CustomerTable
