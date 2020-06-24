import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {BASE_URL} from "../../utils/constants";
import axios from 'axios';
import {connect} from 'react-redux';
import { removeBCode, addBCode } from '../../reducers';
import { removeAllFunction } from '../../reducers';

const mapStateToProps = state => {
	return{
		businessCode: state.businessCodeS.businessCode
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  removeBCode: () => dispatch(removeBCode()),
	  addBCode: (payload) => dispatch(addBCode(payload)),
	  removeAllFunction: () => dispatch(removeAllFunction())
	}
}


const dataForChart = (groups) => {
	let category = []
	let data = [];
	let index;
	for(index in groups){
		
		category.push(groups[index].business_code);
		data.push({name: groups[index].business_code, y: groups[index].open_amount});
	}
	return {
		data:data,
		category:category
	}
}


let setOptions = (graph_data, props) => {
	let chart_data = dataForChart(graph_data);
	//console.log(chart_data);
	let options ={
		chart : {
			type : 'bar',
			backgroundColor: '#252C48',
			height: '200%',
			width: '400'
		},
	  	title: {
			align: 'left',
			text: 'Total Amount By Company Code',
			style: {
				color: 'white'
			}
	  	},
		xAxis: {
			type: 'category',
			title:{
				text:null
			},
			lineColor:null,
			categories: chart_data.category
		},
		legend:{
			enabled:false
		},
		yAxis: {
			title:{
				text:null
			},
			visible: false
		},
		plotOptions: {
			series:{
				point:{
					events:{
						click:function(){
							this.select(null, false);
							let selected_points = this.series.chart.getSelectedPoints();
							
		
							var filtered_points = [];
							for(let index=0; index < selected_points.length; index++){
								filtered_points = selected_points[index].category;
							}

							//console.log(filtered_points)
							if(filtered_points.length === 0){
								props.removeBCode();
							}else{
								props.addBCode(filtered_points);
							}
							props.removeAllFunction();
						}
					}
				}
			}
		},
		credits: {
			enabled: false
		},
	  	series: [{
			type:'bar',
			name: "Open Amount",
			data: chart_data.data,
			borderWidth: 0
	  	}]
	}
	return options;
}

export class StatsArea extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			graph_data: []
		}
	}
	
	componentDidMount() {
		axios(BASE_URL+'get_data_for_highchart')
		.then(
			response => {
				this.setState({
					graph_data: response.data
				})
				//console.log(response.data.length)
			}
		).catch(
		error => {
			console.log(error)
		}
		)
	}

	render() {
		return (
			<Grid
				container
				style={{
					backgroundColor: '#252C48',
					height:'45%',
					// border:'1px dotted red'
				}}
				>
				<Grid style={{height:'30vh', width:'100%', overflow:'auto'}}>
					<HighchartsReact highcharts={Highcharts} options={setOptions(this.state.graph_data, this.props)} autoid="companycode-chart"/>
				</Grid>
				
			</Grid>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsArea)
