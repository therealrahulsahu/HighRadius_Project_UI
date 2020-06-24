import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";
import TableBody from '@material-ui/core/TableBody';
import MyTableRow from "./MyTableRow";

export class MyTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            checkboxChe: false
        }
    }

    handleCheckBoxChange = (event) => {
        this.setState({
            checkboxChe: event.target.checked
        })
    }

    render(){
        //console.log(this.props.row_data.tuples)
        return(
            <TableContainer style={{width:'100%', height:'100%'}} autoid="invoice-table-customer">
                <Table  stickyHeader aria-label="sticky table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{minWidth:2, backgroundColor:"#1B1F38", height:"2.5vh"}}>
                                <Checkbox checked={this.state.checkboxChe} color='default' style={{color:'white', height:"2.5vh"}} onChange={this.handleCheckBoxChange}>
                                </Checkbox>
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
                            this.props.row_data.map(cols => <MyTableRow key={cols.pk_id} columns={cols} selAll={this.state.checkboxChe}/>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

export default MyTable