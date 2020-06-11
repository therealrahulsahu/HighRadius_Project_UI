import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

export class MiddleTable extends Component {
	render() {
		return (
			<Grid container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					height:"75%",
					// border:"1px dotted white"
			  }}
			 >

			</Grid>
		)
	}
}

export default MiddleTable
