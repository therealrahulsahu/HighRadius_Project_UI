import React, { Component } from 'react';


import Grid from '@material-ui/core/Grid';
import Header from './customer/Header';
import CustomerTable from './customer/CustomerTable';


class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Grid container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        style={{
          height:"100vh",
          width:"100vw",
          // border:"1px dotted red" 
        }}
      >
        <Header/>
        <CustomerTable/>      

      </Grid>
    );
  }
}

export default CustomerDetails;


// light "#252C48"
// dark '#1B1F38'