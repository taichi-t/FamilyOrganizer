import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar";

class SignUp extends Component {
  state = {
    password: "",
    email: "",
    firstName: "",
    lastName: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authErr } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div>
        <Navbar />
        <form action="submit">
          <input
            type="text"
            placeholder="password"
            id="password"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>submit</button>
          {authErr ? <p>{authErr}</p> : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authErr: state.auth.authErr
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
