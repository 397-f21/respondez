// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, push, update, onValue } from "firebase/database";
import { useState, useEffect } from 'react'; // trackable state
import {
  getAuth, GoogleAuthProvider, onIdTokenChanged,
  signInWithRedirect, signOut
} from 'firebase/auth';

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

export const signInWithGoogle = () => {
  signInWithRedirect(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

export const getUID = (user) => {
  if (user == null) { return "" }
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  return userID;
}

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

export const addSubmission = (submission, id) => {
  const auth = getAuth();
  const user = auth.currentUser.uid;
  submission["author"] = user;

  // Get a key for a new Post.
  const newPostKey = push(child(ref(database), '/' + id + '/results/')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/' + id + '/results/' + newPostKey] = submission;
  update(ref(database), updates);

  return newPostKey;
}

// reference: https://firebase.google.com/docs/database/web/read-and-write
export const addForm = (postData) => {
  const auth = getAuth();
  const user = auth.currentUser.uid;
  postData["author"] = user;

  // Get a key for a new Post.
  const newPostKey = push(child(ref(database), '/')).key;

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
  "author": form.author,
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