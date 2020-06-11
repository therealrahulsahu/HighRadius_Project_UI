import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ACard from './ACard';

export class Cards extends Component {
	
	render() {
		const { classes } = this.props;
		return (
			<Grid 
				container
				direction="row"
				justify="space-around"
				alignItems="center"
				style={{
					height: '24%'
				}}

				>
				<ACard type="Total Customer"/>
				<ACard type="Total Open AR"/>
				<ACard type="Average Days Delay"/>
				<ACard type="Total Invoice Open"/>
				
          	</Grid>
		);
	};
}

export default Cards
