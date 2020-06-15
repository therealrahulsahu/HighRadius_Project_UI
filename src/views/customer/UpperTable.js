import React, { Component } from 'react'
import { Grid} from '@material-ui/core'
import CounterLabels from './CounterLabels'
import ModificationButton from './ModificationButton'

export class UpperTable extends Component {
	render() {
		return (
			<Grid container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					height:"15%",
					backgroundColor:'#252C48'
					// border:"1px dotted white"
				}}
			  >
				<ModificationButton/>
				<CounterLabels/>
				
			</Grid>
		)
	}
}

export default UpperTable
