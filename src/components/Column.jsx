import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Create from "./Create";

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable
          droppableId={this.props.column.id}
          // type={this.props.column.id === "column-3" ? "done" : "active"}
          isDropDisabled={this.props.isDropDisabled}
        >
          {(provided, snapshot) => (
            <TaskLisk
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={this.props.column.id}
                />
              ))}
              {provided.placeholder}
            </TaskLisk>
          )}
        </Droppable>
        {this.props.index === 0 ? (
          <Create columnId={this.props.column.id} />
        ) : null}
      </Container>
    );
  }
}

//style

const Container = styled.div`
  background-color: #eceff1;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 33.333%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  padding: 8px;
`;
const TaskLisk = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "#eceff1")};
  flex-grow: 1;
  min-height: 100px;
`;
