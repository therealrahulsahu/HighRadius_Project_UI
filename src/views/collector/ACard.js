import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

export class ACard extends Component {
	constructor(props){
		super(props)
		this.state = {
			value:0
		}
	}
	render() {
		return (
			<Grid>
				<Card varient="outlined"
					style={{
						backgroundColor: '#252C48',
						height:"20vh",
						width:"20vw",
						textAlign: "center"
					}}
					>
					<CardContent>
						<Typography
							style={{
								color: 'white',
								fontSize:"4vh",
							}}
							>{this.props.type}</Typography>
						<Typography
							style={{
								color: 'white',
								fontSize:"8vh"
							}}
							>{this.state.value}</Typography>
					</CardContent>
				</Card>
			</Grid>
		)
	}
}

export default ACard
