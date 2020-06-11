import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TablePagination from '@material-ui/core/TablePagination';

export class LowerTable extends Component {
	render() {
		return (
			<Grid container
				direction='row'
				justify='flex-end'
				alignItems='strech'
				style={{
					backgroundColor:'#252C48',
					height:'10%',
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

export default LowerTable
