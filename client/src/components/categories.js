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

import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var temp = [];
var sum = 0;
var tempBills = 0;
var tempDining = 0;
var tempEducation = 0;
var tempEntertainment = 0;
var tempGroceries = 0;
var tempHealth = 0;
var tempShopping = 0;
var tempTransportation = 0;
var tempOther = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.month}</td>
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
		
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeCategory = this.onChangeCategory.bind(this);
		this.onChangeSort = this.onChangeSort.bind(this);
		this.updateChart = this.updateChart.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
		
        this.state = {
			expensesArray: [],
			category: 'Bills',
			year: 2019,
			bills: 0,
			dining: 0,
			education: 0,
			entertainment: 0,
			groceries: 0,
			health: 0,
			shopping: 0,
			transportation: 0,
			other: 0,
			total: 0
		};
    }
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	componentDidMount() {
		// Remove token from local storage
		localStorage.removeItem('pageToken');
		// Set token to localStorage
		localStorage.setItem('pageToken', '/categories');
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
        axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: this.state.category,
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
			
		this.updateChart();
    }
	
	updateChart(){
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		axios.post('/expenses/category', {
				id: idOfUser,
				newCategory: 'Bills',
				newYear: this.state.year
			})
            .then(response => {
				temp = response.data;
				tempBills = sumBy(temp, 'amount');
                this.setState({ 
					bills: tempBills
				});
            })
            .catch(function (error){
                console.log(error);
            })
			
		axios.post('/expenses/category', {
				id: idOfUser,
				newCategory: 'Dining',
				newYear: this.state.year
			})
            .then(response => {
				temp = response.data;
				tempDining = sumBy(temp, 'amount');
                this.setState({ 
					dining: tempDining
				});
            })
            .catch(function (error){
                console.log(error);
            })
			
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Education',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempEducation = sumBy(temp, 'amount');
                this.setState({ 
					education: tempEducation
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Entertainment',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempEntertainment = sumBy(temp, 'amount');
                this.setState({ 
					entertainment: tempEntertainment
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Groceries',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempGroceries = sumBy(temp, 'amount');
                this.setState({ 
					groceries: tempGroceries
				});
            })
            .catch(function (error){
                console.log(error);
            })
			
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Health',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempHealth = sumBy(temp, 'amount');
                this.setState({ 
					health: tempHealth
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Shopping',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempShopping = sumBy(temp, 'amount');
                this.setState({ 
					shopping: tempShopping
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Transportation',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempTransportation = sumBy(temp, 'amount');
                this.setState({ 
					transportation: tempTransportation
				});
            })
            .catch(function (error){
                console.log(error);
            })
		
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: 'Other',
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				tempOther = sumBy(temp, 'amount');
                this.setState({ 
					other: tempOther
				});
            })
            .catch(function (error){
                console.log(error);
            })
	}
	
	onChangeCategory(category) {
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
        axios.post('expenses/category', {
			id: idOfUser,
			newCategory: category,
			newYear: this.state.year
		})
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					category: category,
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
	
	onSubmit(e) {	
		e.preventDefault();
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		axios.post('/expenses/category', {
			id: idOfUser,
			newCategory: this.state.category,
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
			
		this.updateChart();
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
            <div className= "App">
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
			
				<div className = "spacing">
					<h3><center>{"Expenses Breakdown for " + this.state.year}</center></h3>
					<div className = "flex_row">
						<div className = "divider" style={{width: 400}}>
							<form onSubmit={this.onSubmit}>
								<label><center>Current Year: </center>
									<input type="text" 
										placeholder={this.state.year} 
										className="form-control" 
										value={this.state.year} 
										onChange={this.onChangeYear}
									/>
								</label>
									<input type="submit" value="Update" className="btn btn-info" />
								</center>
							</form>
						</div>
				  
						<PieChart 
							data={[
								["Bills", this.state.bills], 
								["Dining Out", this.state.dining], 
								["Education", this.state.education], 
								["Entertainment", this.state.entertainment], 
								["Groceries", this.state.groceries], 
								["Health", this.state.health], 
								["Shopping", this.state.shopping], 
								["Transportation", this.state.transportation], 
								["Other", this.state.other]
							]} 
							colors ={["#dc4048", "#f6821f","#feb913","#7acdf1","#003f6b","#763585","#d23c77","#ff4f79", "#ff997f"]}
						/>
					</div>
	
					<div className="container" style={{ marginTop: 50 }}>
						<nav className="navbar navbar-expand-sm navbar-light bg-light">
							<div className="collpase navbar-collapse">
								<ul className="navbar-nav mr-auto">
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Bills')}}>Bills</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Dining')}}>Dining Out</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Education')}}>Education</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Entertainment')}}>Entertainment</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Groceries')}}>Groceries</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Health')}}>Health</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Shopping')}}>Shopping</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Transportation')}}>Transportation</button>
									<button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Other')}}>Other</button>
								</ul>
							</div>
						</nav>
					</div>
					
					<div style={{ marginTop: 20 }}>
						<h5>{this.state.category + " " + this.state.year + " Total: $" + parseFloat(this.state.total).toFixed( 2 )} </h5>
						<link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
						<BootstrapTable 
							data={this.state.expensesArray} 
							headerStyle={ { background: '#3cb3bb' } }
							striped hover 
							version='4' 
							cellEdit={ cellEdit } 
							options={ options }
							pagination 
							multiColumnSearch>
								<TableHeaderColumn isKey dataField='description' dataSort>Description</TableHeaderColumn>
								<TableHeaderColumn dataField='amount' dataSort>Amount</TableHeaderColumn>
								<TableHeaderColumn dataField='month' dataSort>Month</TableHeaderColumn>
								<TableHeaderColumn dataField='day' dataSort>Day</TableHeaderColumn>
								<TableHeaderColumn dataField='year' dataSort>Year</TableHeaderColumn>
								<TableHeaderColumn dataField='groupCode' dataSort>Group</TableHeaderColumn>
						</BootstrapTable>
					</div>
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