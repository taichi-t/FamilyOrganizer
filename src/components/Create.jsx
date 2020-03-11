import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../store/actions/action";

class Create extends Component {
  state = {
    title: null,
    content: null
  };
  render() {
    const { columnId } = this.props;

    const handleClick = e => {
      e.preventDefault();
      const title = this.state.title;
      const content = this.state.content;
      this.props.createProject(title, content);
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
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          id="title"
        />
        <input
          type="text"
          placeholder="content"
          onChange={handleChange}
          id="content"
        />
        <button datatype={columnId} onClick={handleClick}>
          Create
        </button>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (title, content) => dispatch(createProject(title, content))
  };
};

export default connect(null, mapDispatchToProps)(Create);
