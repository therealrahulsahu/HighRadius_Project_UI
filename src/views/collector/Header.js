import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {ReactComponent as Freda } from '../../assets/john.svg';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AppLogo from '../../assets/companyLogo.svg';
import ProfessorBot from '../ProfessorBot';

export class Header extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
		}
		this.bot_ref = React.createRef();
	}
	
	render() {
		
		return (
			<Grid container
				style={{
					height: '6%',
					// border:"1px solid white"
					}}
					direction="row"
					justify="space-between"
					alignItems="stretch"
          		>
				<Grid container
					justify="center"
					style={{
						width:"5vw",
						marginTop:"1vh"
						// border:"1px solid white"
					}}
					>
					<img height="30px" width="30px"  src={AppLogo} alt="$$$$"/>
				</Grid>

				<Grid container
					direction="row"
					justify="space-between"
					style={{
						width:"93vw",
						// border:"1px solid white"
					}}
				>
					<Typography 
						style={{
							color:"white",
							fontSize: '4vh',
							fontFamily: 'sanserif',
							fontWeight:'bold'
							}}
						>ABC Products
					</Typography>
					<Grid item style={{width:'14vw' }}>
						<Typography 
							align="center"
							style={{
								color: "white",
								backgroundColor: "#fc7500",
								height: "3.5vh",
								paddingLeft:'8px',
								paddingRight:'8px',
								borderRadius:'0 0 10px 10px',
								fontSize:'1vw'
							}}>
							Receivables DashBoard
						</Typography>
					</Grid>
					<Button
						autoid="professor-button"
						style={{
						color: "white",
						backgroundColor: "#fc7500",
						height: "5vh",
						width: "27vh",
						borderRadius: "20px",
						marginTop:"1vh",
						marginRight:"1vw"
						}}
						onClick={this.handleOpenBot}
						variant="contained"
					>
					<Typography style={{fontSize: '2.5vh'}}>Professor</Typography>
					<Freda style={{ height: "5vh", width: "5vh", marginRight: '-3vw' }} />
				</Button>
				<ProfessorBot ref={this.bot_ref}/>
				</Grid>
          </Grid>

		)
	}
	handleOpenBot = () => {
		this.bot_ref.current.handleOpen();
	}
}

export default Header
