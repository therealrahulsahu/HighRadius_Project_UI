import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import UpperInvoiceTable from './UpperInvoiceTable'
import MiddleInvoiceTable from './MiddleInvoiceTable'

export class InvoiceTable extends Component {
	render() {
		return (
			<Grid
				container
				direction="column"
				justify="space-between"
				alignItems="center"
				style={{
					backgroundColor: "#252C48",
					// border:"1px solid blue",
					width:"68%"
				}}
				>
				<UpperInvoiceTable/>
				<MiddleInvoiceTable/>
			</Grid>
		)
	}
}

export default InvoiceTable
