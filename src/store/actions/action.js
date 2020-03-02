export const changeHomeIndex = homeIndex => {
  return { type: "CAHNGE_HOMEINDEX", homeIndex };
};

export const changeIndex = newColumn => {
  return { type: "CHANGE_INDEX", newColumn };
};

export const changeColumn = newState => {
  return { type: "CHANGE_COLUMN", newState };
};

// export const settingInitialStateFromFirestore = () => {
//   return { type: "SETTING_STATE_FROM_FIRESTORE" };
// };

export const settingInitialStateFromFirestore = () => {
  return (dispatch, getState, { getFirestore }) => {
    const preState = getState();
    const firestore = getFirestore();

    firestore
      .collection("projects")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          dispatch({
            type: "SETTING_DATA_FROM_FIRESTORE_SUCCESS",
            preState: preState,
            payload: doc.data()
          });
        });
      })
      .catch(err => {
        dispatch({ type: "SETTING_DATA_FROM_FIRESTORE_ERR", err });
      });
  };
};
