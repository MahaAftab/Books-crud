import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CollRef = collection(db, "posts");

class PostDataService {
  addPost = (newPost) => {
    return addDoc(CollRef, newPost);
  };

  updatedPost = (id, updatedPost) => {
    const postDoc = doc(db, "posts", id);
    return updateDoc(postDoc, updatedPost);
  };

  deletePost = (id) => {
    const postDoc = doc(db, "posts", id);
    return deleteDoc(postDoc);
  };

  getAllPosts = () => {
    return getDocs(CollRef);
  };

  getPost = (id) => {
    const postDoc = doc(db, "posts", id);
    return getDoc(postDoc);
  };
}

export default new PostDataService();
