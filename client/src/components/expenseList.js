import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import jwt_decode from "jwt-decode";

import logo from "../o-logo.png";

import  { Redirect } from 'react-router-dom';

// Load config keys
const secretOrKey = "this-is-a-really-long-secret-key-yeehaw";

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var temp = [];
var sum = 0;

class TodosList extends Component {

    constructor(props) {
        super(props);
		
		this.onChangeSort = this.onChangeSort.bind(this);
		this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
		
        this.state = {
			expensesArray: [],
			userName: '',
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
		localStorage.setItem('pageToken', '/dashboard');
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		
        axios.post('/expenses/getAllExpenses', {
			id: idOfUser
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
		// Duplicate POST request a couple times for when new expenses are added to db
		axios.post('/expenses/getAllExpenses', {
			id: idOfUser
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
		axios.post('/expenses/getAllExpenses', {
			id: idOfUser
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
			
		axios.get('/expenses/user/'+idOfUser)
            .then(response => {
				// Run with a delay
				setTimeout(
					this.setState({
						userName: response.data.name
					}),
					500
				)
            })
            .catch(function (error) {
                console.log(error);
            })
		// Duplicate GET request for timing delay to make all values correct
		axios.get('/expenses/user/'+idOfUser)
            .then(response => {
				// Run with a delay
				setTimeout(
					this.setState({
						userName: response.data.name
					}),
					500
				)
            })
            .catch(function (error) {
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
            <div className = "App">
			
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
								<Link to="/categories" className="nav-link">Category Page</Link>
							</li>
							<li className="navbar-item">
								<Link to="/monthly" className="nav-link">Monthly Page</Link>
							</li>
							<li className="navbar-item">
								<Link to="/group" className="nav-link">Group Page</Link>
							</li>
							<li className="navbar-item">
							  <Link to="/account" className="nav-link">Your Account</Link>
							</li>
						</ul>
						<ul className = "navbar-nav ml-auto">
							<li className = "navbar-item">
								<button 
									style={{ 
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
								onClick={this.onLogoutClick}
								className="btn btn-info" >
								<Link to = "login" 
									className = "nav-link" 
									class = "rounded"
									style = {{ 
									fontWeight:"300", 
									color: "white"
								}}>
								Logout</Link></button>
							</li>
						</ul>
					</div>
				</nav>
			
				<div style={{ marginTop: 50 }}>
					<h1><center>{this.state.userName + "'s Expenses"}</center></h1>
					<center><h5>Total: ${this.state.total.toFixed(2)} </h5></center>
				</div>
				
                <div className = "spacing">
				   <h5><center> To edit an expense, just double click on the item you want updated!</center></h5>
				<link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
				<BootstrapTable 
					data={this.state.expensesArray}
					headerStyle={ { background: '#3cb3bb' } }
					striped hover 
					version='4' 
					cellEdit={ cellEdit } 
					options={ options }
					pagination 
					search 
					multiColumnSearch>
					  <TableHeaderColumn isKey dataField='description' dataSort>Description</TableHeaderColumn>
					  <TableHeaderColumn dataField='amount' dataSort>Amount</TableHeaderColumn>
					  <TableHeaderColumn dataField='category' dataSort>Category</TableHeaderColumn>
					  <TableHeaderColumn dataField='month' dataSort>Month</TableHeaderColumn>
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