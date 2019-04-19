import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

import { Link } from 'react-router-dom';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import jwt_decode from "jwt-decode";
import logo from "../o-logo.png";

const optionsCategory = [
  { value: 'Bills', label: 'Bills' },
  { value: 'Dining', label: 'Dining Out' },
  { value: 'Education', label: 'Education' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Health', label: 'Health' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Other', label: 'Other' }
];

const optionsMonth = [
  { value: 'Jan', label: 'Jan' },
  { value: 'Feb', label: 'Feb' },
  { value: 'Mar', label: 'Mar' },
  { value: 'Apr', label: 'Apr' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'Jun' },
  { value: 'Jul', label: 'Jul' },
  { value: 'Aug', label: 'Aug' },
  { value: 'Sep', label: 'Sep' },
  { value: 'Oct', label: 'Oct' },
  { value: 'Nov', label: 'Nov' },
  { value: 'Dec', label: 'Dec' }
];

const optionsDay = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
  { value: 31, label: 31 }
];

const optionsCode = [
  { value: '', label: 'No group code' },
  { value: jwt_decode(localStorage.getItem("jwtToken")).groupCode.toString(), label: 'User group code' }
];

class CreateExpense extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
		this.onChangeCategory = this.onChangeCategory.bind(this);
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeDay = this.onChangeDay.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeGroupCode = this.onChangeGroupCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            amount: '',
            category: '',
            selectedMonth: '',
            selectedDay: '',
            year: '',
			groupCode: ''
        }
    }
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }
	
	onChangeCategory(selectedCategory) {
        this.setState({
            category: selectedCategory.value
        });
    }
	
	onChangeMonth(selectedMonth) {
        this.setState({
            month: selectedMonth.value
        });
    }
	
	onChangeDay(selectedDay) {
        this.setState({
            day: selectedDay.value
        });
    }
	
	onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }
	
	onChangeGroupCode(selectedCode) {
        this.setState({
            groupCode: selectedCode.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
     
        const newExpense = {
			userId: idOfUser,
            description: this.state.description.charAt(0).toUpperCase() + this.state.description.slice(1).toLowerCase(),
            amount: parseFloat(this.state.amount).toFixed( 2 ),
			category: this.state.category,
            month: this.state.month,
            day: this.state.day,
            year: this.state.year,
            groupCode: this.state.groupCode
        };

        axios.post('/expenses/add', newExpense)
            .then(res => console.log(res.data));
 
		this.setState = {
            description: '',
            amount: '',
			category: '',
            month: '',
            day: '',
            year: '',
            groupCode: ''
        }
		
		this.props.history.push('/dashboard');
    }

    render() {
		const { selectedCategory } = this.state;
		const { selectedMonth } = this.state;
		const { selectedDay } = this.state;
		const { selectedCode } = this.state;
		
		const codeOfUser = jwt_decode(localStorage.getItem("jwtToken")).groupCode;
		
        return (
			<div className = "App">	
		   <div style={{marginTop: 10}}>
                
				
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
					</div>
					<button
					style={{
					width: "150px",
					borderRadius: "3px",
					letterSpacing: "1.5px",
					marginTop: "1rem"
					}}
					onClick={this.onLogoutClick}
					className="btn btn-large waves-effect waves-light hoverable blue accent-3"
					>
					Logout
				</button>
				</nav>
				<center><h3>Create New Expense</h3></center>
				<div className = "spacing">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input 
							type="text" 
							className="form-control"
							value={this.state.amount}
							onChange={this.onChangeAmount}
							/>
                    </div>
					<div className="form-group">
					  <label>Category: </label>
					  <Select
						name="Category"
						placeholder={this.state.category}
						value={selectedCategory}
						options={optionsCategory}
						onChange={this.onChangeCategory}
					  />
					</div>
					<div className="form-group">
					  <label>Month: </label>
					  <Select
						name="Month"
						placeholder={this.state.month}
						value={selectedMonth}
						options={optionsMonth}
						onChange={this.onChangeMonth}
					  />
					</div>					
					<div className="form-group">
					  <label>Day: </label>
					  <Select
						name="Day"
						placeholder={this.state.day}
						value={selectedDay}
						options={optionsDay}
						onChange={this.onChangeDay}
					  />
					</div>
					<div className="form-group"> 
                        <label>Year: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                />
                    </div>
					<div className="form-group"> 
                        <label>Group Code: </label>
                        <Select
							name="Group Code"
							placeholder={this.state.month}
							value={selectedCode}
							options={optionsCode}
							onChange={this.onChangeGroupCode}
						/>
                    </div>

                    <div className="form-group">
                        <center><input type="submit" value="Create Expense" className="btn btn-info" /></center>
                    </div>
                </form>
				</div>
            </div>
		</div>
        )
    }
}

CreateExpense.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(CreateExpense);