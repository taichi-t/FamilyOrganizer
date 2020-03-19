import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar";

//style
import styled from "styled-components";
import { StyledAlert } from "../childComponents/FormChildComponents";
import { Button } from "../childComponents/Button";
import { Title } from "../childComponents/FormChildComponents";
import { Form } from "../childComponents/FormChildComponents";
import { StyledTextField } from "../childComponents/FormChildComponents";
import { ButtonContainer } from "../childComponents/FormChildComponents";

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
      <>
        <Navbar />
        <Container>
          <Title>SignUp</Title>
          <Form action="submit">
            <StyledTextField
              type="text"
              label="email"
              id="email"
              fullWidth={true}
              onChange={this.handleChange}
            />
            <StyledTextField
              type="text"
              label="password"
              id="password"
              fullWidth={true}
              onChange={this.handleChange}
            />
            <StyledTextField
              type="text"
              label="first Name"
              id="firstName"
              fullWidth={true}
              onChange={this.handleChange}
            />
            <StyledTextField
              type="text"
              label="last Name"
              id="lastName"
              fullWidth={true}
              onChange={this.handleChange}
            />
            {authErr ? (
              <StyledAlert variant="filled" severity="error">
                {authErr}
              </StyledAlert>
            ) : null}
            <ButtonContainer>
              <Button color="#77d672" onClick={this.handleClick}>
                submit
              </Button>
            </ButtonContainer>
          </Form>
        </Container>
      </>
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

//styled

const Container = styled.div`
  text-align: center;
`;
