import React from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import Navbar from "../Navbar";
import { Redirect } from "react-router-dom";

//style
import styled from "styled-components";
import { StyledAlert } from "../childComponents/FormChildComponents";
import { Button } from "../childComponents/Button";
import { Title } from "../childComponents/FormChildComponents";
import { Form } from "../childComponents/FormChildComponents";
import { StyledTextField } from "../childComponents/FormChildComponents";
import { ButtonContainer } from "../childComponents/FormChildComponents";

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
      <>
        <Navbar location={this.props.history.location.pathname} />
        <Container>
          <Title>SignIn</Title>
          <Form action="submit">
            <StyledTextField
              id="email"
              type="text"
              label="email"
              fullWidth={true}
              onChange={this.handleChange}
              color="primary"
            />
            <StyledTextField
              type="text"
              id="password"
              label="password"
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

//styled

const Container = styled.div`
  text-align: center;
`;
