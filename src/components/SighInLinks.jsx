import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import { Link } from "react-router-dom";

class SighInLinks extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.signOut}>Log out</button>
        <Link to="/">{this.props.profile.initials}</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: listeners => dispatch(signOut(listeners))
  };
};

export default connect(null, mapDispatchToProps)(SighInLinks);
