import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import logo from "../o-logo.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import jwt_decode from "jwt-decode";
import  { Redirect } from 'react-router-dom';

import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var temp = [];
var sum = 0;
var tempJan = 0;
var tempFeb = 0;
var tempMar = 0;
var tempApr = 0;
var tempMay = 0;
var tempJun = 0;
var tempJul = 0;
var tempAug = 0;
var tempSep = 0;
var tempOct = 0;
var tempNov = 0;
var tempDec = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
		<td>{props.item.category}</td>
        <td>{props.item.day}</td>
        <td>{props.item.year}</td>
		<td>{props.item.groupCode}</td>
        <td>
            <Link to={"/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

class TodosList extends Component {

    constructor(props) {
        super(props);
		
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeBudget = this.onChangeBudget.bind(this);
		this.onChangeSort = this.onChangeSort.bind(this);
		this.updateCharts = this.updateCharts.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmitBudget = this.onSubmitBudget.bind(this);
		this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
		
        this.state = {
			expensesArray: [],
			month: 'Jan',
			year: 2019,
			Jan: 0,
			Feb: 0,
			Mar: 0,
			Apr: 0,
			May: 0,
			Jun: 0,
			Jul: 0,
			Aug: 0,
			Sep: 0,
			Oct: 0,
			Nov: 0,
			Dec: 0,
			budget: 0,
			balance: 0,
			total: 0
		};
    }
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	componentDidMount() {		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
        axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: this.state.month,
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
				tempJan = sum;
                this.setState({ 
					expensesArray: temp,
					Jan: tempJan,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		this.updateCharts();
    }
	
	updateCharts(){
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Jan',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempJan = sumBy(temp, 'amount');
                this.setState({ 
					Jan: tempJan
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Feb',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempFeb = sumBy(temp, 'amount');
                this.setState({ 
					Feb: tempFeb
				});
            })
            .catch(function (error){
                console.log(error);
            })
			
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Mar',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempMar = sumBy(temp, 'amount');
                this.setState({ 
					Mar: tempMar
				});
            })
            .catch(function (error){
                console.log(error);
            })
			
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Apr',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempApr = sumBy(temp, 'amount');
                this.setState({ 
					Apr: tempApr
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'May',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempMay = sumBy(temp, 'amount');
                this.setState({ 
					May: tempMay
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Jun',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempJun = sumBy(temp, 'amount');
                this.setState({ 
					Jun: tempJun
				});
            })
            .catch(function (error){
                console.log(error);
            })
			
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Jul',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempJul = sumBy(temp, 'amount');
                this.setState({ 
					Jul: tempJul
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Aug',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempAug = sumBy(temp, 'amount');
                this.setState({ 
					Aug: tempAug
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Sep',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempSep = sumBy(temp, 'amount');
                this.setState({ 
					Sep: tempSep
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Oct',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempOct = sumBy(temp, 'amount');
                this.setState({ 
					Oct: tempOct
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Nov',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempNov = sumBy(temp, 'amount');
                this.setState({ 
					Nov: tempNov
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/month', {
			id: idOfUser,
			newMonth: 'Dec',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempDec = sumBy(temp, 'amount');
                this.setState({ 
					Dec: tempDec
				});
            })
            .catch(function (error){
                console.log(error);
            })
	}
	
	onChangeMonth(e) {	
		this.setState({
            month: e
        });
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
        axios.post('expenses/month', {
			id: idOfUser,
			newMonth: e,
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					balance: parseFloat(this.state.budget - sum).toFixed( 2 ),
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sortItem) {
		temp = this.state.expensesArray;
		temp = sortBy(temp, sortItem);
		sum = sumBy(temp, 'amount');
		this.setState({ 
				expensesArray: temp,
				total: sum
			});
    }
	
	onChangeYear(e) {
		this.setState({
            year: e.target.value
        });        
    }
	
	onChangeBudget(e) {
		this.setState({
            budget: e.target.value,
			balance: "-"
        });
    }
	
	onSubmitBudget(e) {
		e.preventDefault();	

		this.setState({
			  budget: parseFloat(this.state.budget).toFixed( 2 ),
			  balance: parseFloat(this.state.budget - this.state.total).toFixed( 2 )
		});
	}
	
	onSubmit(e) {	
		e.preventDefault();
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		axios.post('expenses/month', {
			id: idOfUser,
			newMonth: this.state.month,
			newYear: this.state.year
			
			})
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })	
		
		this.updateCharts();
    }

    onRowDoubleClick(row){
		this.props.history.push('/edit/'+row._id)
	}

    render() {
		const options = {
			onRowDoubleClick: this.onRowDoubleClick,
			onSortChange: this.onChangeSort,
			defaultSortName: 'description',
			defaultSortOrder: 'asc'
		  };
		
		const cellEdit = {
			mode: 'dbclick' // double click cell to edit
		  };
		  
        return (
            <div className = "AppM">
              <nav className="navbar navbar-expand-sm navbar-light navbar-custom sticky-top">
					<img src={logo} width="400" height="80" alt=""/>
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav mr-auto">
						<li className="navbar-item">
						  <Link to="/dashboard" className="nav-link">All Expenses</Link>
						</li>
						<li className="navbar-item">
						  <Link to="/create" className="nav-link">Create Expense</Link>
						</li>
						<li className="navbar-item">
						  <Link to="/categories" className="nav-link">Categories</Link>
						</li>
						<li className="navbar-item">
						  <Link to="/monthly" className="nav-link">Monthly</Link>
						</li>
						<li className="navbar-item">
						  <Link to="/group" className="nav-link">Group</Link>
						</li>
					  </ul>
					<ul className = "navbar-nav ml-auto">
							<li className = "navbar-item">
								<button style={{ width: "150px",borderRadius: "2px",letterSpacing: "1.5px",marginTop: "1rem"}}
					onClick={this.onLogoutClick}
					className="btn btn-info">
					<Link to = "login" className = "nav-link">
					Logout</Link></button>
				</li>
				</ul>
				</div>
				</nav>
				<div className = "divider">	
					<form onSubmit={this.onSubmit}>
						<div className = "flex">
						<center><label>Current Year:
							<input type="text" 
								placeholder={this.state.year} 
								className="form-control" 
								value={this.state.year} 
								onChange={this.onChangeYear}/>
							
								<input type="submit" value="Update" className="btn btn-info" />
							
						</label></center>
						</div>
					</form>
				</div>
			  <h3><center>{"Expenses for " + this.state.year}</center></h3>
			  
			  <ColumnChart data={[
					["Jan", this.state.Jan], 
					["Feb", this.state.Feb], 
					["Mar", this.state.Mar],
					["Apr", this.state.Apr],
					["May", this.state.May],
					["Jun", this.state.Jun],
					["Jul", this.state.Jul],
					["Aug", this.state.Aug],
					["Sep", this.state.Sep],
					["Oct", this.state.Oct],
					["Nov", this.state.Nov],
					["Dec", this.state.Dec]
				]} />	
			
			
			<form onSubmit={this.onSubmitBudget}>
				<label>{"Budget for " + this.state.year + ", " + this.state.month + ": " + " "}
				<input type="text" 
					placeholder={this.state.budget} 
					className="form-control" 
					value={this.state.budget} 
					onChange={this.onChangeBudget}/>
				<input type="submit" value="Update" className="btn btn-info" /></label>
			</form>
			
			<div className = "spacing">
			<h5>Budget: ${this.state.budget} </h5>
			<h5>Expenses Total: ${parseFloat(this.state.total).toFixed( 2 )} </h5>
			<h5> ---------------------------- </h5>
			<h5>Balance: ${this.state.balance} </h5>
			</div>
			  
			  <div className = "divider"/>
				<div className="container">
				  <nav className="navbar navbar-expand-sm navbar-light bg-light">
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav mr-auto">
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Jan')}}>Jan</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Feb')}}>Feb</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Mar')}}>Mar</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Apr')}}>Apr</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('May')}}>May</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Jun')}}>Jun</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Jul')}}>Jul</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Aug')}}>Aug</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Sep')}}>Sep</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Oct')}}>Oct</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Nov')}}>Nov</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Dec')}}>Dec</button>
					  </ul>
					</div>
				  </nav>
				</div>
				
				<div className = "spacing">
				
                <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
				<BootstrapTable 
					data={this.state.expensesArray} 
					striped hover 
					version='4' 
					cellEdit={ cellEdit } 
					options={ options }
					pagination search multiColumnSearch>
					  <TableHeaderColumn isKey dataField='description' dataSort>Description</TableHeaderColumn>
					  <TableHeaderColumn dataField='amount' dataSort>Amount</TableHeaderColumn>
					  <TableHeaderColumn dataField='category' dataSort>Category</TableHeaderColumn>
					  <TableHeaderColumn dataField='day' dataSort>Day</TableHeaderColumn>
					  <TableHeaderColumn dataField='year' dataSort>Year</TableHeaderColumn>
					  <TableHeaderColumn dataField='groupCode' dataSort>Group</TableHeaderColumn>
				</BootstrapTable>
				
				</div>
            </div>
        )
    }
}

TodosList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TodosList);