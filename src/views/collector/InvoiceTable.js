import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import UpperInvoiceTable from './UpperInvoiceTable'
import LowerInvoiceTable from './LowerInvoiceTable'
import MiddleInvoiceTable from './MiddleInvoiceTable'

export class InvoiceTable extends Component {
	render() {
		return (
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="stretch"
				style={{
					backgroundColor: "#252C48",
					// border:"1px solid blue",
					width:"68%"
				}}
				>
				<UpperInvoiceTable/>
				<MiddleInvoiceTable/>
				<LowerInvoiceTable/>
			</Grid>
		)
	}
}

export default InvoiceTable
