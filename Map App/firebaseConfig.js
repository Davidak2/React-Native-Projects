import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTthhhRg61y1jkMYdmfTN430vXPE3cVAA",
  authDomain: "mapapp-6a22c.firebaseapp.com",
  projectId: "mapapp-6a22c",
  storageBucket: "mapapp-6a22c.appspot.com",
  messagingSenderId: "909157957350",
  appId: "1:909157957350:web:80017386d327e61f13c527"
};

if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig)
}

export { firebase }