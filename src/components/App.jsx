import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "@atlaskit/css-reset";

import Column from "./Column";
import styled from "styled-components";
import { connect } from "react-redux";

//actions
import { changeHomeIndex } from "../store/actions/action";
import { changeIndex } from "../store/actions/action";
import { changeColumn } from "../store/actions/action";

import { compose } from "redux";

import { firestoreConnect } from "react-redux-firebase";

class App extends Component {
  onDragStart = start => {
    const { projectsData } = this.props;

    const projects =
      projectsData && projectsData.reduce((obj, data) => ({ ...obj, data }));

    const homeIndex = projects.columnOrder.indexOf(start.source.droppableId);

    this.props.changeHomeIndex(homeIndex);
  };

  onDragEnd = result => {
    const { projectsData } = this.props;

    const projects =
      projectsData && projectsData.reduce((obj, data) => ({ ...obj, data }));
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
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...projects,
      columns: {
        ...projects.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.props.changeColumn(newState);
  };
  render() {
    const { projectsData } = this.props;

    const projects =
      projectsData && projectsData.reduce((obj, data) => ({ ...obj, data }));

    console.log(projects);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <Container>
          {projects &&
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
    // projects: state.projects,
    projectsData: state.firestore.ordered && state.firestore.ordered.projects
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeHomeIndex: homeIndex => dispatch(changeHomeIndex(homeIndex)),
    changeIndex: newColumn => dispatch(changeIndex(newColumn)),
    changeColumn: newState => dispatch(changeColumn(newState))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => {
    return [
      {
        collection: "projects"
      }
    ];
  })
)(App);

//styled components

const Container = styled.div`
  display: flex;
`;
