import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2uaLHyNB4F5VpUTfLyFFQobDrySAZtsw",
    authDomain: "fashion-x-c72e0.firebaseapp.com",
    projectId: "fashion-x-c72e0",
    storageBucket: "fashion-x-c72e0.appspot.com",
    messagingSenderId: "921742120513",
    appId: "1:921742120513:web:64246da69de0e5380798c0"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
var auth = firebase.auth()


export { provider, auth };