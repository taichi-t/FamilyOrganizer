export const changeHomeIndex = homeIndex => {
  return { type: "CAHNGE_HOMEINDEX", homeIndex };
};

export const changeIndex = newColumn => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const id = newColumn.id;

    firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr")
      .update({
        [`columns.${id}.taskIds`]: newColumn.taskIds
      })
      .catch(err =>
        dispatch({
          type: "CHANGE_INDEX_ERR",
          err
        })
      );
    dispatch({ type: "CHANGE_INDEX", newColumn });
  };
};

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

export const changeColumn = (newState, cahngedTasks) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const start = cahngedTasks.newStart;
    const targetId = cahngedTasks.newStart.draggableId;
    const finish = cahngedTasks.newFinish;

    const batch = firestore.batch();

    const startRef = firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr");
    batch.update(startRef, {
      [`columns.${start.id}.taskIds`]: firebase.firestore.FieldValue.arrayRemove(
        targetId
      )
    });

    const finishRef = firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr");
    batch.update(finishRef, {
      [`columns.${finish.id}.taskIds`]: finish.taskIds
    });

    batch.commit().catch(err => {
      dispatch({ type: "CHANGE_COLUMN_ERR", err });
    });

    dispatch({
      type: "CHANGE_COLUMN_SUCCESS",
      newState
    });
  };
};

export const createProject = (title, content) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const id = firestore.collection("projects").doc().id;
    const batch = firestore.batch();

    const taskRef = firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr");
    batch.update(taskRef, {
      [`tasks.${id}`]: { content, id }
    });

    const columnRef = firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr");
    batch.update(columnRef, {
      "columns.column-1.taskIds": firebase.firestore.FieldValue.arrayUnion(id)
    });

    batch.commit().catch(err => {
      dispatch({ type: "CREATE_TASK_ERR", err });
    });

    dispatch({
      type: "CREATE_TASK_SUCCESS",
      task: { content, id }
    });
  };
};
export const deleteTask = (id, columnId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const batch = firestore.batch();

    const columnTaskRef = firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr");
    batch.update(columnTaskRef, {
      [`columns.${columnId}.taskIds`]: firebase.firestore.FieldValue.arrayRemove(
        id
      )
    });

    const tasksRef = firestore
      .collection("projects")
      .doc("QK4DCwYDrWmunRsbbjIr");
    batch.update(tasksRef, {
      [`tasks.${id}`]: firebase.firestore.FieldValue.delete()
    });

    batch
      .commit()
      .then(
        dispatch({
          type: "DELETE_TASK_SUCCESS",
          id,
          columnId
        })
      )
      .catch(err => {
        dispatch({ type: "DELETE_TASK_ERR", err });
      });
  };
};
