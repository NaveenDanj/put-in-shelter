// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMqXrP3czbaSZTaVNyx14MTtebEQvysJY",
  authDomain: "put-in-shelter-firebase.firebaseapp.com",
  projectId: "put-in-shelter-firebase",
  storageBucket: "put-in-shelter-firebase.appspot.com",
  messagingSenderId: "473195517855",
  appId: "1:473195517855:web:fa02007470674c2ec20faa",
  measurementId: "G-QQN7V1JLBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);