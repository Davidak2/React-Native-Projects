import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  /*Your API info Here*/
};

if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
