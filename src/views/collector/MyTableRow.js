import React, {Component} from "react";
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";
import {ML_URL} from "../../utils/constants";
import axios from 'axios';
import {connect} from 'react-redux';
import { addFunction, removeFunction, removeAllFunction } from '../../reducers';
import { markUpdate } from "../../reducers";


const mapStateToProps = state => {
	return{
        predFunctions: state.predStore.predFunctions,
        updateCount: state.updateCounterReducer.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
      addFunction: (pk_id, func) => dispatch(addFunction(pk_id, func)),
      removeFunction: (pk_id) => dispatch(removeFunction(pk_id)),
      removeAllFunction: () => dispatch(removeAllFunction()),
      markUpdate: () => dispatch(markUpdate())
	}
}


export class MyTableRow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pred_type: "",
            pred_amount: -1,
            pk_id:this.props.columns.pk_id,
            ch_select: false,
            customer_number: this.props.columns.customer_number,
            cust_payment_terms: this.props.columns.cust_payment_terms,
            actual_open_amount: this.props.columns.actual_open_amount
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

        return this.output
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // if(prevProps.columns.pk_id !== this.props.columns.pk_id){
        //     this.setState({
        //         pk_id:this.props.columns.pk_id,
        //         customer_number: this.props.columns.customer_number,
        //         cust_payment_terms: this.props.columns.cust_payment_terms,
        //         actual_open_amount: this.props.columns.actual_open_amount
        //     })
        // }
        if(prevProps.selAllCh !== this.props.selAllCh){
            this.toggleCheckBox(this.props.selAllCh);
        }
        if(prevProps.updateCount !== this.props.updateCount){
            this.setState({
                ch_select: false,
                pred_type: "",
                pred_amount: "-1"
            })
        }
    }

    toggleCheckBox = (condition) => {
        this.setState({
            ch_select: condition
        })
        if(condition){
            this.props.addFunction(this.state.pk_id, this.fetchPrediction);
        }else{
            this.props.removeFunction(this.state.pk_id);
            this.setState({
                pred_type: "",
                pred_amount: -1
            })
        }
    }

    onClickCheckBox = (event) => {
        this.toggleCheckBox(event.target.checked);
    }


    checkForAmount = (amount) => {
        if(amount>=0){
            return(amount);
        }else{
            return("");
        }
    }

    fetchPrediction = () => {
        let queryObj = {
            data:[
                {
                    customer_number: this.state.customer_number,
                    cust_payment_terms: this.state.cust_payment_terms,
                    actual_open_amount: this.state.actual_open_amount
                }
            ]
        }
        axios.post(ML_URL+ 'predict', queryObj
        ).then(
            response => {
                this.setState({
                    pred_amount: response.data[0].amount,
                    pred_type: response.data[0].type
                })
            }
        ).catch(
        error => {
            console.log(error)
        }
		)
    }
    

    render() {
        
        return(
            <TableRow>
                <TableCell style={{color:"white", backgroundColor:"#1B1F38", height:"0.8vh"}}>
                    <Checkbox checked={this.state.ch_select} onChange={this.onClickCheckBox} color='default' style={{color:"white", height:"0.8vh"}}/>
                </TableCell>
                
                {
                    this.get_full_row(this.props.columns).map((column, index) => {
                        return (
                            <TableCell key={index} style={{color:"white", backgroundColor:"#1B1F38", height:"0.8vh"}}>{column}</TableCell>
                        );
                    })
                }

                <TableCell style={{color:"white", backgroundColor:"#1B1F38",minWidth:160, height:"0.8vh"}} >{this.state.pred_type}</TableCell>
                <TableCell style={{color:"white", backgroundColor:"#1B1F38",minWidth:100, height:"0.8vh"}} >{this.checkForAmount(this.state.pred_amount)}</TableCell>
            </TableRow>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTableRow)