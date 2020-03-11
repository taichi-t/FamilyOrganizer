import React, { Component } from "react";

//styles
import Column from "./Column";
import styled from "styled-components";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import "@atlaskit/css-reset";

//actions
import { changeHomeIndex } from "../store/actions/action";
import { changeIndex } from "../store/actions/action";
import { changeColumn } from "../store/actions/action";
import { settingInitialStateFromFirestore } from "../store/actions/action";

//react,react-redux,react-redux-firestore
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

//utils

class App extends Component {
  componentWillMount() {
    this.props.settingInitialStateFromFirestore();
  }
  onDragStart = start => {
    const projects = this.props.projects;

    const homeIndex = projects.columnOrder.indexOf(start.source.droppableId);

    this.props.changeHomeIndex(homeIndex);
  };

  onDragEnd = result => {
    const projects = this.props.projects;

    const homeIndex = null;
    this.props.changeHomeIndex(homeIndex);

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = projects.columns[source.droppableId];
    const finish = projects.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);

      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      this.props.changeIndex(newColumn);
      return;
    }

    //moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
      draggableId: draggableId
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...projects.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    };

    const changedTasks = {
      newStart: newStart,
      newFinish: newFinish
    };

    this.props.changeColumn(newState, changedTasks);
  };
  render() {
    const projects = this.props.projects;

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <TitleContainer>
          <h1 style={{ textAlign: "center" }}>Draggable Todo List</h1>
        </TitleContainer>
        <Container>
          {projects.length !== 0 &&
            projects.columnOrder.map((columnId, index) => {
              const column = projects.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => projects.tasks[taskId]
              );

              // const isDropDisabled = index < this.state.homeIndex;

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  // isDropDisabled={isDropDisabled}
                />
              );
            })}
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeHomeIndex: homeIndex => dispatch(changeHomeIndex(homeIndex)),
    changeIndex: newColumn => dispatch(changeIndex(newColumn)),
    changeColumn: (newState, changedTasks) =>
      dispatch(changeColumn(newState, changedTasks)),
    settingInitialStateFromFirestore: empty =>
      dispatch(settingInitialStateFromFirestore(empty))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
)(App);

//styled components

const Container = styled.div`
  background-color: #fff;
  display: flex;
`;

const TitleContainer = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 24px 0;
`;
