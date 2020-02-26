import initialData from "../../initial-data";

const initialState = initialData;

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
    case "CHANGE_COLUMN":
      state = action.newState;
      return state;

    default: {
      return state;
    }
  }
};

export default projectReducer;
