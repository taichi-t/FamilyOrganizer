import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { resetAuthErr } from "../store/actions/authActions";
import { connect } from "react-redux";

//style
import styled from "styled-components";
import { Title } from "./childComponents/Title";
import { Button } from "./childComponents/Button";

class SighOutLinks extends Component {
  handleClick = e => {
    this.props.resetAuthErr();
  };
  render() {
    const TitleWithText = <Title>Draggabel Todo Task</Title>;
    const navlink =
      this.props.location === "/signIn" ? (
        <Container>
          {TitleWithText}
          <NavLink to="signUp" onClick={this.handleClick}>
            <Button color="white">Sign Up</Button>
          </NavLink>
        </Container>
      ) : (
        <Container>
          {TitleWithText}
          <NavLink to="signIn" onClick={this.handleClick}>
            <Button color="white">Log In</Button>
          </NavLink>
        </Container>
      );
    return <div>{navlink}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetAuthErr: homeIndex => dispatch(resetAuthErr(homeIndex))
  };
};

export default connect(null, mapDispatchToProps)(SighOutLinks);

//style
const Container = styled.div`
  padding: 3.2rem 0;
  width: 100%;
`;
