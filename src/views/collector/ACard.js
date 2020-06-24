import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

export class ACard extends Component {
	
	check_initials(value, initials){
		value = parseInt(value)
		if(initials === "money"){
			if(value/1000000>1){
				return("$"+Math.round(value/1000000)+"M")
			}else if(value/1000>1){
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
						width:"24vw",
						textAlign: "center"
					}}
					>
					<CardContent>
						<Typography
							style={{
								color: 'grey',
								fontSize:"2.8vh",
								marginBottom: '1.5vw'
							}}
							>{this.props.type}</Typography>
						<Typography
							autoid={this.props.useId}
							style={{
								color: 'white',
								fontSize:"4vh"
							}}
							>{this.check_initials(this.props.value, this.props.initials)}</Typography>
					</CardContent>
				</Card>
			</Grid>
		)
	}
}

export default ACard
