import React, { Component } from 'react'
import { Grid, TablePagination } from '@material-ui/core'

export class LowerInvoiceTable extends Component {
	render() {
		return (
			<Grid
				container
				direction='row'
				justify='flex-end'
				alignItems='strech'
				style={{
					backgroundColor:'#252C48',
					height:'15%',
					// border:'1px solid white'
				}}
				>
					<TablePagination
						style={{
							color:'white',
							height:'80%',
							marginRight:'20px'
						}}
					/>
				
			</Grid>
		)
	}
}
export default LowerInvoiceTable