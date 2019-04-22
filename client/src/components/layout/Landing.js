import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';


import '../../App.css';

import logo2 from "../../o-logo.png";
import mobile from "../../google.png";
import logo from "../../money_sign.png";
import picture from "../../calc.jpg";
import description from "../../pic.PNG";

class Landing extends Component {
  render() {
    return (
		<div className= "App">
			
		
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
				
					
					<nav className = "navbar navbar-expand-sm navbar-light navbar-custom sticky-top">
					<h1><img src = {logo2} width = "400" height = "80"  alt = ""/></h1>
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav ml-auto">
						<li className="navbar-item">
						<right><button
							  style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							  }}
								type="submit"
								className="btn btn-info">
						<Link to="login" className="nav-link" style = {{ fontWeight:"300", color: "white"}}>Login</Link></button></right>
						</li>						
						
						
						</ul>
					</div>
					</nav>
				<div className = "spacingL">
				<div className = "row">
					<div className = "Picture">
							<center><h1><img src = {mobile} width = "300" height = "300" class = "rounded" alt = ""/></h1></center>
							<center><h5>Click to download the android app!</h5></center>
						</div>
				
					<div className = "right">
						<center><h2>Here in Track Dat Ca$h...</h2></center>
					
						<center><h4>You have the option to view your expenses in a personal or group setting</h4></center>
						<center><h4>Plan your finances and keep a budget</h4></center>
						<center><h4>Track your expenses monthly</h4></center>
						<center><h4>Analyze your expenses</h4></center>
						<center><h4> Want to get started? Login or Sign up Now!</h4></center>
						
						<center><button 
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							type="submit"
							className="btn btn-info">
							<Link to="register" 
								className="nav-link"
								style = {{ 
									fontWeight:"300", 
									color: "white"
								}}
							>Register</Link>
						</button></center>
						
						<div className = "spacingpic"></div>
						<center><img src = {logo} width = "50" height = "50" class="img-circle"  alt = ""/></center>
					</div>
				</div>
				</div>
		</div>
		
    );
  }
}

export default Landing;