import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import UpperTable from './UpperTable';
import MiddleTable from './MiddleTable';
import LowerTable from './LowerTable';

export class CustomerTable extends Component {
	render() {
		return (
			<Grid container
				direction="column"
				justify="space-between"
				alignItems="stretch"
				style={{
				height:"90%",
				width:"100%"}}
			  >
				<UpperTable/>
        		<MiddleTable/>
        		<LowerTable/>
			</Grid>
		)
	}
}

export default CustomerTable
