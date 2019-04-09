import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import CreateUser from "./components/createUser";
import ExpensesList from "./components/expenseList";
import CreateExpense from "./components/createExpense";
import EditExpense from "./components/editExpense";
import Categories from "./components/categories";
import Monthly from "./components/monthly";
import Group from "./components/groupPage";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";


import picture from "./fin_plan.jpg";
import logo2 from "./o-logo.png";
import logo from "./money_sign.png";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
     
		<Router>
          <div className="App">
			
			<Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
			
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ExpensesList} />
			  <PrivateRoute exact path="/create" component={CreateExpense} />
			  <PrivateRoute exact path="/edit/:id" component={EditExpense} />
			  <PrivateRoute exact path="/categories" component={Categories} />
			  <PrivateRoute exact path="/monthly" component={Monthly} />
			  <PrivateRoute exact path="/group" component={Group} />
            </Switch>
      
		  </div>
		  
        </Router>
      </Provider>
    );
  }
}

export default App;