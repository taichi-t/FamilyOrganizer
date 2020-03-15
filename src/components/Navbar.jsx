import React, { Component } from "react";
import { connect } from "react-redux";
import SignInLinks from "./SighInLinks";
import SignOutLinks from "./SignOutLinks";

class Navbar extends Component {
  render() {
    const { auth, profile } = this.props;

    const links = auth.uid ? (
      <SignInLinks profile={profile} />
    ) : (
      <SignOutLinks />
    );
    return <div>{links}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
