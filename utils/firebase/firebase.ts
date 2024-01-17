// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app’s Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBduph4L9kCChrIRhkFVCDrjynbrNGFExQ",
  authDomain: "whatsapp-clone-1-0.firebaseapp.com",
  projectId: "whatsapp-clone-1-0",
  storageBucket: "whatsapp-clone-1-0.appspot.com",
  messagingSenderId: "1071529485616",
  appId: "1:1071529485616:web:fe717936b48794398654f5",
  measurementId: "G-JP4Q1PZZYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = () => {
  if (typeof window === "undefined") return;
  return getAnalytics(app);
};

const auth = getAuth(app);

export { auth, analytics };
