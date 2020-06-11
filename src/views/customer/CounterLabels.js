import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'

export class CounterLabels extends Component {
	constructor(props){
		super(props)
		this.state = {
			open_amount:0,
			open_invoices:0
		}
	}
	render() {
		return (
			<Grid container
					style={{
						width:'30%',
						height:'100%',
						// border:"1px dotted red"
					}}
					direction="row"
					justify="space-between"
					alignItems="center"
					>
					<Grid container
						direction='column'
						alignItems='center'
						style={{
							// border:"1px dotted white",
							width:'50%',
							height:'100%'
						}}
					>	
						<Typography variant='h5' style={{color:"white"}}>
							{this.state.open_invoices}
						</Typography>
						<Typography variant='h6' style={{color:"white"}}>
							Total Open Invoices
						</Typography>
					</Grid>
					<Grid container
						direction='column'
						alignItems='center'
						style={{
							// border:"1px dotted white",
							width:'50%',
							height:'100%',
						}}
					>
						<Typography variant='h5' style={{color:"white"}}>
							${this.state.open_amount}
						</Typography>
						<Typography variant='h6' style={{color:"white"}}>
							Total Open Amount
						</Typography>
					</Grid>
				
			</Grid>
		)
	}
}

export default CounterLabels
