import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Freda from '../../assets/FredaButton.png';
import { Typography } from '@material-ui/core';
import { SvgIcon, Button } from '@material-ui/core';
import AppLogo from '../../assets/companyLogo.svg';





export class Header extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container
				style={{
					height: '6%',
					// border:"1px solid white"
					}}
					direction="column"
					justify="space-between"
					alignItems="stretch"
          		>
				<Grid container
					style={{
						width:"3%",
						// border:"1px solid white"
					}}
					>
					<img height="30px" width="30px" src={AppLogo}/>
				</Grid>

				<Grid container
					style={{
						width:"85%",
						// border:"1px solid white"
					}}
				>
					<Typography 
						style={{
							color:"red",
							fontSize: '3.5vh',
							fontFamily: 'sanserif'
							}}
						>ABC Products
					</Typography>
				</Grid>
				<Grid container
					style={{
						width:"12%",
						// border:"1px solid white"
					}}
				>
					<Button>
						<img height="25" width="130" src={Freda}/>
					</Button>
				</Grid>
          </Grid>

		)
	}
}

export default Header
