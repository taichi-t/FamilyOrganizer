import React from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import Navbar from "../Navbar";
import { Redirect } from "react-router-dom";

class SignIn extends React.PureComponent {
  state = {
    password: "",
    email: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { authErr, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div>
        <Navbar />
        <form action="submit">
          <input
            type="text"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>submit</button>
          <div>{authErr ? <p>authErr</p> : null}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authErr: state.auth.authErr,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
