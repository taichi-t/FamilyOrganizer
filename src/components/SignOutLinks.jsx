import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { resetAuthErr } from "../store/actions/authActions";
import { connect } from "react-redux";

class SighOutLinks extends Component {
  handleClick = e => {
    this.props.resetAuthErr();
  };
  render() {
    return (
      <div>
        <NavLink to="signIn" onClick={this.handleClick}>
          Log In
        </NavLink>
        <NavLink to="signUp" onClick={this.handleClick}>
          Sign Up
        </NavLink>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetAuthErr: homeIndex => dispatch(resetAuthErr(homeIndex))
  };
};

export default connect(null, mapDispatchToProps)(SighOutLinks);
