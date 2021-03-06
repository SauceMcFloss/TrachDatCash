import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import '../../App.css';
import logo2 from "../../o-logo.png";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
		<div className = "App">
		<nav className = "navbar navbar-expand-sm navbar-light navbar-custom sticky-top">
			<h1><img src = {logo2} width = "400" height = "80"  alt = ""/></h1>
		</nav>
		
      <div className="AppRegister">
					
		<center><div className = "body">          
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
         
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <div className = "spacing_name">
				<label htmlFor="name">Name:  </label>
				<input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                </div>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="form-group">
                 <div className = "spacing_email2">
				 <label htmlFor="email">Email: </label>
				<input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
				</div>
               
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="form-group">
				<div className = "spacing_pass">
                <label htmlFor="password">Password:</label>
				<input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
				</div>
                
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password:</label>
				<input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                
                <span className="red-text">{errors.password2}</span>
              </div>
              
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-info"
                >
                  Sign up
                </button>
              
            </form>
          </div>
		  </center>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
