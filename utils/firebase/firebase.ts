// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app’s Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4CpOZdTqrxw62FORoREA_RtJI-b__pNU",
  authDomain: "whatsapp-clone-406006.firebaseapp.com",
  projectId: "whatsapp-clone-406006",
  storageBucket: "whatsapp-clone-406006.appspot.com",
  messagingSenderId: "743181202305",
  appId: "1:743181202305:web:3157eb7ced136362fcee80",
  measurementId: "G-5TT7K75RW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = () => {
  if (typeof window === "undefined") return;
  return getAnalytics(app);
};

const auth = getAuth(app);

export { auth, analytics };
