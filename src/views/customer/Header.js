import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Freda from '../../assets/FredaButton.png';

export class Header extends Component {
	render() {
		return (
			<Grid container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					height:"10%",
					width:'100%'
					// border:"1px dotted white"
				  }}
				>
				<Grid container
					style={{
						width:"20%",
						height:"100%"
					}}>
					<Grid container
						style={{
							// border:'1px solid white',
							height:'100%',
							width:'30%'
							}}>
						<ArrowBackIcon style={{height:'90%', width:'90%', color:'red'}}/>
					</Grid>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
						style={{
							height:'100%',
							// border:'1px solid white',
							width:'69%'
						}}
						>
						<Typography variant='h5' 
							style={{
								color:'white',
								height:'40%'
							}}
							>Walmart</Typography>
						<Typography variant='h6'
							style={{
								color:'white',
								height:'60%'
							}}
							>72960</Typography>
					</Grid>
				</Grid>
				
				<Grid container
					direction='row'
					justify='center'
					alignItems='center'
					style={{
						width:"15%",
						height:"100%",
						//border:'1px solid yellow'
					}}
					>
					<Button><img src={Freda}/></Button>
				</Grid>

			</Grid>
		)
	}
}
export default Header