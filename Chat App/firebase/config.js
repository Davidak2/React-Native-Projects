import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, initializeFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCtr9vY89tWIHdbssSVRIEzcDUd_5xfXHw",
  authDomain: "mychat-949b4.firebaseapp.com",
  projectId: "mychat-949b4",
  storageBucket: "mychat-949b4.appspot.com",
  messagingSenderId: "622336879769",
  appId: "1:622336879769:web:c5fac4b9d3a35e0c44dc08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = initializeFirestore(app, { experimentalLongForcePolling:true });
export const userRef = collection(db, "Users")
export const chatRef = collection(db, "Chats")