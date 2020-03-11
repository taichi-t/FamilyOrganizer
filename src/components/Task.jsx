import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { deleteTask } from "../store/actions/action";
import { compose } from "redux";
import { connect } from "react-redux";

class Task extends React.Component {
  render() {
    const handleClick = e => {
      const id = this.props.task.id;
      const columnId = this.props.columnId;
      this.props.deleteTask(id, columnId);
    };
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            {this.props.task.content}
            <button onClick={handleClick}>delete</button>
          </Container>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTask: (id, columnId) => dispatch(deleteTask(id, columnId))
  };
};

export default compose(connect(null, mapDispatchToProps))(Task);

//style

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;
