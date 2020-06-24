import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { removeAllRow } from "../../reducers";
import {ReactComponent as Freda } from '../../assets/john.svg';
import { removeUser } from '../../reducers';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {BASE_URL} from "../../utils/constants";
import axios from "axios";
import ProfessorBot from '../ProfessorBot';


const mapStateToProps = state => {
	return{
		userNumber: state.userLogin.userNumber
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  removeUser: () => dispatch(removeUser()),
	  removeAllRow: () => dispatch(removeAllRow())
	}
}

export class Header extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			cs_number: this.props.userNumber,
			cs_name:  0
		}
		this.bot_ref = React.createRef();
	}
	
	componentDidMount(){
		//console.log(this.state.cs_number)
		axios(BASE_URL+'get_customer_name_by_customer_number?cs_number='+this.state.cs_number)
			.then(
				response => {
					this.setState({
						cs_name: response.data.customer_name
					})
					//console.log(response.data)
				}
			).catch(
			error => {
				console.log(error)
			}
		)
	}

	handleBackButton = (event) => {
		this.props.removeUser();
		this.props.removeAllRow();
		this.props.history.push('/');
	}
	
	render() {
		return (
			<Grid container
				direction="row"
				justify="space-between"
				alignItems="stretch"
				style={{
					height:"10%",
					width:'100vw'
					// border:"1px dotted white"
				  }}
				>
				<Grid container
					direction="row"
					alignItems="flex-start"
					style={{
						width:"30vw",
						height:"100%",
						//border:'1px solid white'
					}}>
					<Grid item
						style={{
							//border:'1px dotted white',
							height:'100%',
							width:'4vw'
							}}>
						<ArrowBackIcon onClick={this.handleBackButton} style={{height:'10vh', width:'4vw', color:'white', cursor:'pointer'}} autoid="navigation-back-button"/>
					</Grid>
					<Grid container
						direction="column"
						justify="center"
						alignItems="stretch"
						style={{
							height:'100%',
							//border:'1px solid red',
							width:'25.8vw'
						}}
						>
						<Typography
							style={{
								color:'white',
								height:'40%',
								fontSize:'1.5vw',
								marginLeft:'1vw',
								marginTop:'1vh'
							}}
							autoid="customer-name"
							>{this.state.cs_name}</Typography>
						<Typography
							style={{
								color:'white',
								height:'40%',
								fontSize:'2vh',
								marginLeft:'1vw'
							}}
							autoid="customer-number"
							>{this.props.userNumber}</Typography>
					</Grid>
				</Grid>
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
							marginRight:'1vw',
							fontSize:'1vw'
						}}>
						Receivables DashBoard
					</Typography>
				</Grid>
				<Button
					style={{
					color: "white",
					backgroundColor: "#fc7500",
					height: "5vh",
					width: "12vw",
					borderRadius: "20px",
					marginTop:"2vh",
					marginRight:"1vw"
					}}
					onClick={this.handleOpenBot}
					variant="contained"
					>
					<Typography style={{fontSize: '1vw'}}>Professor</Typography>
					<Freda style={{ height: "5vh", width: "5vh", marginRight: '-3vw'}} />
				</Button>
				<ProfessorBot ref={this.bot_ref}/>
			</Grid>
		)
	}
	handleOpenBot = () => {
		this.bot_ref.current.handleOpen();
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))