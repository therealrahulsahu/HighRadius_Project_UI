import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";
import TableBody from '@material-ui/core/TableBody';
import MyTableRow from "./MyTableRow";
import {connect} from 'react-redux';
import { markUpdate } from "../../reducers";

const mapStateToProps = state => {
	return{
        businessCode: state.businessCodeS.businessCode,
        updateCount: state.updateCounterReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
        markUpdate: () => dispatch(markUpdate())
	}
}

export class MyTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectAllCheckbox:false
        }
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.businessCode !== this.props.businessCode){
            this.setState({
                selectAllCheckbox:false
            })
        }
        if(prevProps.updateCount !== this.props.updateCount){
            this.setState({
                selectAllCheckbox:false
            })
        }
    }

    handleCheckBox = (event) =>{
        this.setState({
            selectAllCheckbox: event.target.checked
        })
    }

    render(){
        //console.log(this.props.row_data.tuples)
        return(
            <TableContainer style={{width:'100%', height:'100%'}} autoid="invoice-table-collector">
                <Table  stickyHeader aria-label="sticky table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{minWidth:2, backgroundColor:"#1B1F38", height:"2.5vh"}}>
                                <Checkbox color='default' checked={this.state.selectAllCheckbox} style={{color:'white', height:"2.5vh"}} onChange={this.handleCheckBox}/>
                            </TableCell>
                            {this.props.columns.map((col) => (
                                <TableCell
                                    key={col.id}
                                    style={{color:"white", backgroundColor:"#1B1F38",minWidth:col.minWidth, height:"2.5vh"}}
                                >
                                    {col.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.row_data.tuples.map(cols => <MyTableRow key={cols.pk_id} columns={cols} selAllCh={this.state.selectAllCheckbox}/>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(MyTable)