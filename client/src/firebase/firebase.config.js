// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJGBd-lhz4_jE9Yl9aHwHX8Hk97vBWgmc",
    authDomain: "mern-book-store-ba773.firebaseapp.com",
    projectId: "mern-book-store-ba773",
    storageBucket: "mern-book-store-ba773.appspot.com",
    messagingSenderId: "874467789322",
    appId: "1:874467789322:web:788de1ca7e253a60836df3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;