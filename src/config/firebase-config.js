// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth";

import { getFirestore } from "firebase/firestore"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTvnIvF2cF0fdGNbrDMBf_7Gm4DuMGqzA",
  authDomain: "expense-tracker-6c1b3.firebaseapp.com",
  projectId: "expense-tracker-6c1b3",
  storageBucket: "expense-tracker-6c1b3.appspot.com",
  messagingSenderId: "1066387173072",
  appId: "1:1066387173072:web:90637ab736b1166da638d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app);
//firebase login,firebase init,firebase deploy
