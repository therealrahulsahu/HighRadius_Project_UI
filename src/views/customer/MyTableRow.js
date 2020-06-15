import React, {Component} from "react";
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";

export class MyTableRow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            check_box: false,
            pk_id:this.props.columns.pk_id
        }
    }

    checkForNull = (dict, key) => {
        try{
            return (dict[key])
        }catch (e) {
            return ("-")
        }
    }

    get_full_row = (tuple) => {
        this.output = []

        this.output.push(this.checkForNull(tuple, "company_id"))
        this.output.push(this.checkForNull(tuple, "acct_doc_header_id"))
        this.output.push(this.checkForNull(tuple, "document_number"))
        this.output.push(this.checkForNull(tuple, "business_code"))
        this.output.push(this.checkForNull(tuple, "doctype"))
        this.output.push(this.checkForNull(tuple, "customer_number"))
        this.output.push(this.checkForNull(tuple, "fk_customer_map_id"))
        this.output.push(this.checkForNull(tuple, "customer_name"))
        this.output.push(this.checkForNull(tuple, "document_create_date"))
        this.output.push(this.checkForNull(tuple, "baseline_create_date"))
        this.output.push(this.checkForNull(tuple, "invoice_date_norm"))
        this.output.push(this.checkForNull(tuple, "invoice_id"))
        this.output.push(this.checkForNull(tuple, "total_open_amount"))
        this.output.push(this.checkForNull(tuple, "cust_payment_terms"))
        this.output.push(this.checkForNull(tuple, "clearing_date"))
        this.output.push(this.checkForNull(tuple, "isopen"))
        this.output.push(this.checkForNull(tuple, "ship_date"))
        this.output.push(this.checkForNull(tuple, "paid_amount"))
        this.output.push(this.checkForNull(tuple, "dayspast_due"))
        this.output.push(this.checkForNull(tuple, "document_id"))
        this.output.push(this.checkForNull(tuple, "document_creation_date"))
        this.output.push(this.checkForNull(tuple, "actual_open_amount"))
        this.output.push(this.checkForNull(tuple, "invoice_age"))
        this.output.push(this.checkForNull(tuple, "invoice_amount_doc_currency"))
        this.output.push(this.checkForNull(tuple, "predicted_payment_type"))
        this.output.push(this.checkForNull(tuple, "predicted_amount"))

        return this.output
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.pk_id !== this.props.columns.pk_id){
            this.setState({
                pk_id:this.props.columns.pk_id
            })
        }
    }

    onClickCheckBox = (event) => {
        console.log(this.state.pk_id)
    }
    

    render() {
        
        return(
            <TableRow>
                <TableCell style={{color:"white", backgroundColor:"#1B1F38"}}>
                    <Checkbox onChange={this.onClickCheckBox} color='default' style={{color:"white"}}/>
                </TableCell>
                
                {
                    this.get_full_row(this.props.columns).map((column, index) => {
                        return (
                            <TableCell key={index} style={{color:"white", backgroundColor:"#1B1F38"}}>{column}</TableCell>
                        );
                    })
                }
            </TableRow>
        )
    }
}

export default MyTableRow