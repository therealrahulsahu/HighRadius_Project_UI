import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

export class ACard extends Component {
	
	check_initials(value, initials){
		value = parseInt(value)
		if(initials === "money"){
			if(value%1000000>0){
				return("$"+Math.round(value/1000000)+"M")
			}else if(value%1000>0){
				return("$"+Math.round(value/1000)+"K")
			}else{
				return("$"+value)
			}
		}else if(initials === "days"){
			return(""+value+" Days")
		}else{
			return(""+value)
		}
	}
	render() {
		return (
			<Grid>
				<Card varient="outlined"
					style={{
						backgroundColor: '#252C48',
						height:"20vh",
						width:"100%",
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
								fontSize:"6vh"
							}}
							>{this.check_initials(this.props.value, this.props.initials)}</Typography>
					</CardContent>
				</Card>
			</Grid>
		)
	}
}

export default ACard
