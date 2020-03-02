// import { firestore } from "firebase";

export const fetchDataFromFirestore = (firestore, collectionId) => {
  firestore
    .collection(collectionId)
    .get()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};
