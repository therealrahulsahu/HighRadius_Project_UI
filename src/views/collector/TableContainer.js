import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SidePanel from './SidePanel';
import InvoiceTable from './InvoiceTable';

export class TableContainer extends Component {
	render() {
		return (
			<Grid
				style={{
					height: '70%',
					//backgroundColor: '#252C48',
					// border: '1px dotted red'
				  }}
				direction="row"
				justify="space-around"
				alignItems="stretch"
            container
          >
			  <SidePanel/>
			  <InvoiceTable/>
          </Grid>
		)
	}
}

export default TableContainer
