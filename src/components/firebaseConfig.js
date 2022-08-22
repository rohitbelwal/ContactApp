// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCItf2XEhorgnpKW2y9QMRlX4VLdQsnx5Q",
  authDomain: "imagedb-ec369.firebaseapp.com",
  projectId: "imagedb-ec369",
  storageBucket: "imagedb-ec369.appspot.com",
  messagingSenderId: "279429090475",
  appId: "1:279429090475:web:1f00a277c4f7682930bbee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;