import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { deleteTask } from "../store/actions/action";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";

//style
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

class Task extends React.Component {
  handleClick = e => {
    const id = this.props.task.id;
    const columnId = this.props.columnId;
    this.props.deleteTask(id, columnId);
  };
  render() {
    const { task } = this.props;

    return (
      <Draggable draggableId={task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {task.title}
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                  {task.content}
                </Typography>
                <Typography color="textSecondary">
                  Created by {task.firstName}
                </Typography>
                <Typography color="textSecondary">
                  {moment(task.createdAt).calendar()}
                </Typography>
              </CardContent>
              <Button
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={this.handleClick}
              >
                Delete
              </Button>
            </Card>
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
  margin-bottom: 10px;
  background-color: ${props => (props.isDragDisabled ? "lightgrey" : "white")};
`;
