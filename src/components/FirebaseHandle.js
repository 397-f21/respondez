// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, push, update, onValue } from "firebase/database";
import { useState, useEffect } from 'react'; // trackable state
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
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const addSubmission = (submission, id) => {
  // Get a key for a new Post.
  const newPostKey = push(child(ref(database), '/' + id + '/results/')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/' + id + '/results/' + newPostKey] = submission;
  update(ref(database ), updates);

  return newPostKey;
}

// reference: https://firebase.google.com/docs/database/web/read-and-write
export const addForm = (elements) => {
  const postData = {
    "eventName": elements.eventName.value,
    "date": elements.eventDateInput.value,
    "description": elements.eventDescription.value,
    "isCapacityLimit": elements.isThereCapacity.checked ? parseInt(elements.capacityLimit.value) : parseInt(-1),
    "waitlist": elements.isThereCapacity.checked ? elements.isThereWaitlist.checked : false,
    "needsEmail": elements.askEmail.checked,
    "needsPhone": elements.askPhoneNum.checked,
    "results": {}
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(database), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/' + newPostKey] = postData;
  update(ref(database), updates);

  return newPostKey; // return the hashed value
}

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
      const dbRef = ref(database, path);
      return onValue(dbRef, (snapshot) => {
          const val = snapshot.val();
          setData(transform ? transform(val) : val);
          setLoading(false);
          setError(null);
      }, (error) => {
          setData(null);
          setLoading(false);
          setError(error);
      });
  }, [path, transform]);

  return [data, loading, error];
};

export const formData = form => ({
  "eventName": form.eventName,
  "date": form.date,
  "description": form.description,
  "isCapacityLimit": form.isCapacityLimit,
  "waitlist": form.waitlist,
  "needsEmail": form.needsEmail,
  "needsPhone": form.needsPhone,
  "results": form.results
});

export const allData = data => (data)