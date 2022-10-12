import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD4SBoAsWFbtdGysSeaji3l10PIQTBkXLI",
  authDomain: "books-crud-b5818.firebaseapp.com",
  projectId: "books-crud-b5818",
  storageBucket: "books-crud-b5818.appspot.com",
  messagingSenderId: "630529531699",
  appId: "1:630529531699:web:159374b50292a3be83e846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
