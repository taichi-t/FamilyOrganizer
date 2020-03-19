export const fetchDataFromFirestore = (firestore, collectionId) => {
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
