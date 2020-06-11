import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

export class ModificationButton extends Component {
	render() {
		return (
			<Grid container
				justify="flex-start"
				direction="row"
				alignItems="center"
				style={{
					width:"30%",
					height:"100%",
					// border:"1px dotted red",
				}}
				>
					<Button variant='contained' color='secondary'
						style={{
							marginLeft:'10px'
						}}
						>Modify</Button>
					<Button variant='contained' color="primary"
						style={{
							marginLeft:'10px'
						}}
						>Export</Button>
			</Grid>
		)
	}
}

export default ModificationButton
