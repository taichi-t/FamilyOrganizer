import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../store/actions/action";
import styled from "styled-components";

//style
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

class Create extends Component {
  state = {
    title: null,
    content: null
  };
  render() {
    const { columnId, profile } = this.props;

    const handleClick = e => {
      e.preventDefault();
      const title = this.state.title;
      const content = this.state.content;
      this.props.createProject(title, content, profile);
      this.setState({ title: null, content: null });
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
    };

    const handleChange = e => {
      e.preventDefault();
      if (e.target.id === "title") {
        this.setState({ title: e.target.value });
      } else {
        this.setState({ content: e.target.value });
      }
    };
    return (
      <>
        <Container>
          <Input
            placeholder="Title"
            id="title"
            onChange={handleChange}
            style={{ marginBottom: 10, display: "block" }}
          />
          <Input
            placeholder="Content"
            onChange={handleChange}
            id="content"
            style={{ marginBottom: 30, display: "block" }}
          />

          <Button
            variant="contained"
            color="primary"
            datatype={columnId}
            endIcon={<CreateIcon />}
            onClick={handleClick}
          >
            Create
          </Button>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (content, title, profile) =>
      dispatch(createProject(content, title, profile))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);

//style
const Container = styled.div`
  background-color: #eceff1;
  padding: 10px;
  border-radius: 4px;
`;
