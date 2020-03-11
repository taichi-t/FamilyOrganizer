const initialState = [];

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CAHNGE_HOMEINDEX":
      return {
        ...state,
        homeIndex: action.homeIndex
      };
    case "CHANGE_INDEX":
      const newColumnId = action.newColumn.id;

      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumnId]: action.newColumn
        }
      };

    case "CHANGE_INDEX_ERR":
      console.log("change index err", action.err);
      return state;

    case "CHANGE_COLUMN_SUCCESS":
      return {
        ...state,
        columns: action.newState
      };

    case "CHANGE_COLUMN_ERR":
      console.log("change column err", action.err);
      return state;

    case "SETTING_DATA_FROM_FIRESTORE_SUCCESS":
      state = action.preState;

      return {
        ...state.projects,
        ...action.payload
      };

    case "SETTING_DATA_FROM_FIRESTORE_ERRO":
      return state;

    case "CREATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: action.task
        },
        columns: {
          ...state.columns,
          "column-1": {
            ...state.columns["column-1"],
            taskIds: [...state.columns["column-1"].taskIds, action.task.id]
          }
        }
      };
    case "CREATE_TASK_ERR":
      console.log("create task err", action.err);
      return state;

    case "DELETE_TASK_SUCCESS":
      const taskIdsInColumn = state.columns[`${action.columnId}`].taskIds;
      const newTaskIdsInColumn = taskIdsInColumn.filter(item =>
        item !== action.id ? item : null
      );

      const newTaskIds = {};

      for (let key in state.tasks) {
        if (key !== action.id) {
          newTaskIds[key] = state.tasks[key];
        }
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[`${action.columnId}`],
            taskIds: newTaskIdsInColumn
          }
        },

        task: newTaskIds
      };

    case "DELETE_TASK_ERR":
      console.log("deete task err", action.err);
      return state;

    default: {
      return state;
    }
  }
};

export default projectReducer;
