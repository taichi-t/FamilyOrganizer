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

class App extends Component {
  onDragStart = start => {
    const homeIndex = this.props.columnOrder.indexOf(start.source.droppableId);
    this.props.changeHomeIndex(homeIndex);
  };

  onDragEnd = result => {
    // this.setState({
    //   homeIndex: null
    // });
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

    const start = this.props.columns[source.droppableId];
    const finish = this.props.columns[destination.droppableId];

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
      ...this.props,
      columns: {
        ...this.props.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.props.changeColumn(newState);
  };
  render() {
    console.log(this.props);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <Container>
          {this.props.columnOrder.map((columnId, index) => {
            const column = this.props.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.props.tasks[taskId]
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
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    changeHomeIndex: homeIndex => dispatch(changeHomeIndex(homeIndex)),
    changeIndex: newColumn => dispatch(changeIndex(newColumn)),
    changeColumn: newState => dispatch(changeColumn(newState))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

//styled components

const Container = styled.div`
  display: flex;
`;
