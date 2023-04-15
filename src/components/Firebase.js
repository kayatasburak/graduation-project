import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzx1xeCFCLsBbSC26FBauCRyqNYnyUppY",
  authDomain: "todoist-a539d.firebaseapp.com",
  databaseURL: "https://todoist-a539d-default-rtdb.firebaseio.com",
  projectId: "todoist-a539d",
  storageBucket: "todoist-a539d.appspot.com",
  messagingSenderId: "289413227595",
  appId: "1:289413227595:web:d36715afa712f77213d9ce",
  measurementId: "G-2JPJBCDB72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        localStorage.setItem("name",name)
        localStorage.setItem("email",email)
        localStorage.setItem("profilePic",profilePic)
    }).catch((error) => {
        console.log(error);
    });
}