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
			total: 0
		};
    }
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

    componentDidMount() {
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
			
				<h3><center>All Expenses</center></h3>
				
                <center><h5>Total: ${this.state.total.toFixed(2)} </h5></center>
                <div className = "spacing">
				   <h3> To edit an expense, just double click on the item you want updated!</h3>
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