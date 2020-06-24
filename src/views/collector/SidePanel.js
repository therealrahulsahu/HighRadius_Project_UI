import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import StatsArea from './StatsArea'
import CustomerQueryPanel from './CustomerQueryPanel'

export class SidePanel extends Component {
	render() {
		return (
			<Grid
				container
				direction='column'
				justify='space-around'
				alignItems='stretch'
				// border:'1px dotted red'
				style={{
					width:"30%"
				}}
				>
				<StatsArea/>
				<CustomerQueryPanel/>
			</Grid>
		)
	}
}

export default SidePanel
