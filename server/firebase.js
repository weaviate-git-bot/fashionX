import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);
const db = app.firestore();

export { db };