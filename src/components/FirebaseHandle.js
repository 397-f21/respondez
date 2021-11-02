// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5aYFd558MjGhM_k7VSyI0p7RfhzaPdvs",
  authDomain: "respondez-cd207.firebaseapp.com",
  databaseURL: "https://respondez-cd207-default-rtdb.firebaseio.com",
  projectId: "respondez-cd207",
  storageBucket: "respondez-cd207.appspot.com",
  messagingSenderId: "97512821081",
  appId: "1:97512821081:web:13415446280335804cbc48",
  measurementId: "G-L3Q0YHBVN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// reference: https://firebase.google.com/docs/database/web/read-and-write
export const addNew = (elements) => {
  const db = getDatabase();

  const postData = {
    "eventName": elements.eventName.value,
    "date": elements.eventDateInput.value,
    "description": elements.eventDescription.value,
    "isCapacityLimit": elements.isThereCapacity.checked ? parseInt(elements.capacityLimit.value) : parseInt(-1),
    "waitlist": elements.isThereCapacity.checked ? elements.isThereWaitlist.checked : false,
    "needsEmail": elements.askEmail.checked,
    "needsPhone": elements.askPhoneNum.checked
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/' + newPostKey] = postData;

  return update(ref(db), updates);
}
