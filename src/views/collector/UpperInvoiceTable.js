import React, { Component } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'

export class UpperInvoiceTable extends Component {
	render() {
		return (
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					backgroundColor:'#252C48',
					height:'13%',
					// border:'1px solid red'
				}}
				>
				<Grid container
					justify='flex-start'
					style={{
						paddingLeft:'10px',
						width:'30%',
						// border:'1px solid white'
					}}
					>
					<Typography variant='h4'
						style={{
							color:'white'
						}}
					>Invoices</Typography>
				</Grid>
				<Grid container
					alignItems='center'
					justify='flex-end'
					style={{
						paddingRight:'10px',
						width:'30%',
						// border:'1px solid yellow'
					}}
					>
					<Button 
						style={{
							height:'70%'
						}}
						variant="contained"
						color="secondary"
					>
						Predict
					</Button>
				</Grid>
			</Grid>
		)
	}
}

export default UpperInvoiceTable
