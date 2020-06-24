import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import { addARow, removeARow, removeAllRow } from "../../reducers";
import {connect} from 'react-redux';
import { CSVLink } from "react-csv";
import ModifyDialog from './ModifyDialog';

const mapStateToProps = state => {
	return{
        tableRows: state.rowDataReducer.tableRows,
        tableSize: state.rowDataReducer.size
	}
}

const mapDispatchToProps = dispatch => {
	return {
      addARow: payload => dispatch(addARow(payload)),
      removeARow: payload => dispatch(removeARow(payload)),
      removeAllRow: () => dispatch(removeAllRow())
	}
}

export class ModificationButton extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			modify_cond: true,
			export_cond: true,
			csvDownload: true
		}
		this.export_ref = React.createRef();
	}
	
	componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.tableSize !== this.props.tableSize){
            if(this.props.tableSize === 1){
				this.setState({
					modify_cond: false
				})
			}else{
				this.setState({
					modify_cond: true
				})
			}
			if(this.props.tableSize > 0){
				this.setState({
					export_cond: false
				})
			}else{
				this.setState({
					export_cond: true
				})
			}
        }
    }

	render() {
		return (
			<Grid container
				justify="flex-start"
				direction="row"
				alignItems="center"
				style={{
					width:"50vw",
					height:"100%",
					//border:"1px dotted red",
				}}
				>
					<Button variant='contained' color='secondary' disabled={this.state.modify_cond} onClick={this.handleModifyOpen}
						style={{
							marginLeft:'2vw'
						}}
						autoid="modify-button"
						>Modify</Button>
					<ModifyDialog ref={this.export_ref}/>
					<Button variant='contained' color="secondary" disabled={this.state.export_cond}
						style={{
							marginLeft:'2vw'
						}}
						autoid="export-button"
						>
						<CSVLink 
							data={this.getCsvData()} 
							style={{textDecoration: 'none' , color:'inherit'}}
							filename={'1705157_exportedData.csv'}
							>
							Export
						</CSVLink>
					</Button>
			</Grid>
		)
	}


	getCsvData = () =>{
		let data = this.props.tableRows;
		let result = []
		for(let index in data){
			result.push(data[index]);
		}
		return(result);
	}

	handleModifyOpen = (event) => {
		this.export_ref.current.setState({
			open:true
		})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificationButton)
