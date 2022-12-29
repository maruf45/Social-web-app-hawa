// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQQB0JLFjj7XdI-hUEzAbP5TfpPQOSZts",
  authDomain: "hawa-7d5f6.firebaseapp.com",
  projectId: "hawa-7d5f6",
  storageBucket: "hawa-7d5f6.appspot.com",
  messagingSenderId: "231531604831",
  appId: "1:231531604831:web:135a5bf0562169510424ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
