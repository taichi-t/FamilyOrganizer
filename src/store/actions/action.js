export const changeHomeIndex = homeIndex => {
  return { type: "CAHNGE_HOMEINDEX", homeIndex };
};

export const changeIndex = newColumn => {
  return { type: "CHANGE_INDEX", newColumn };
};

export const changeColumn = newState => {
  return { type: "CHANGE_COLUMN", newState };
};
