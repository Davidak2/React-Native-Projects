import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, initializeFirestore} from 'firebase/firestore'

const firebaseConfig = {
  /* Your Firebase Configuration Info Goes Here */
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = initializeFirestore(app, { experimentalLongForcePolling:true });
export const userRef = collection(db, "Users")
export const chatRef = collection(db, "Chats")