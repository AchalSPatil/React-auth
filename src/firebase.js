
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTdSlUH6Wd71pao80vn_ue006YtcfNhjk",
  authDomain: "react-authentication-7f876.firebaseapp.com",
  projectId: "react-authentication-7f876",
  storageBucket: "react-authentication-7f876.appspot.com",
  messagingSenderId: "869168068154",
  appId: "1:869168068154:web:a3ed087381fdc5831ce703",
  measurementId: "G-GD00B6SQRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;