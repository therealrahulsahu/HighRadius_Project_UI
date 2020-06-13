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
        }
    }

    render(){
        console.log(this.props.row_data.tuples)
        return(
            <TableContainer style={{width:'100%', height:'100%'}}>
                <Table  stickyHeader aria-label="sticky table" size='small'>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{minWidth:5}}>
                                <Checkbox color='default'>
                                </Checkbox>
                            </TableCell>
                            {this.props.columns.map((col) => (
                                <TableCell
                                    key={col.id}
                                    style={{minWidth:col.minWidth}}
                                >
                                    {col.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.row_data.tuples.map(cols => <MyTableRow columns={cols} />)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

export default MyTable