//style
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: "#ACACAC";
  padding: 5rem 0 4rem 0;
`;

export const Form = styled.form`
  display: block;
  font-size: 2rem;
  width: 30%;
  margin: 0 auto;
`;

export const ButtonContainer = styled.div`
  padding: 2rem 0;
`;

export const StyledTextField = styled(TextField)`
  .MuiFormLabel-root {
    color: #ffffff;
    font-size: 1.6rem;
  }
  .MuiInputBase-root {
    color: #ffffff;
    font-size: 1.6rem;
    margin-bottom: 2.5rem;
  }
`;

export const StyledAlert = styled(Alert)`
  .MuiAlert-message {
    font-size: 1.2rem;
  }
`;
