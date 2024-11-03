// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_MGxVLOLbuAtTlnfmne0jwQT7CKC1XFg",
  authDomain: "netflix-clone-1d912.firebaseapp.com",
  projectId: "netflix-clone-1d912",
  storageBucket: "netflix-clone-1d912.appspot.com",
  messagingSenderId: "359079172328",
  appId: "1:359079172328:web:dbec7b52acf648bdbf115d",
  measurementId: "G-LVVB8NHHDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export{app,auth}
