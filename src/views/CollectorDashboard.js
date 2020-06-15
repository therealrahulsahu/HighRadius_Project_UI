import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';


import Header from './collector/Header';
import Cards from './collector/Cards';
import TableContainer from './collector/TableContainer';


class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    
  }

  render() {
    return (
      <Grid container>
        <Grid 
          container 
          style={{ height:'95vh'}}
          direction='column'
          justify='space-between'
          alignItems='stretch'
          
        >
          <Header />
          <Cards />
          <TableContainer/>
        </Grid>
        <Footer/>
      </Grid>
    );
  }
}

export default CollectorDashboard;
