import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class SighOutLinks extends Component {
  render() {
    return (
      <div>
        <NavLink to="signIn">Log In</NavLink>
        <NavLink to="signUp">Sign Up</NavLink>
      </div>
    );
  }
}
