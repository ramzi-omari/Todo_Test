import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAk4qcASO6EBrc4z8-3zOS7E9tXVn51MZU",
  authDomain: "todotest-7fc9f.firebaseapp.com",
  projectId: "todotest-7fc9f",
  storageBucket: "todotest-7fc9f.appspot.com",
  messagingSenderId: "143051817556",
  appId: "1:143051817556:web:835adf4dd4247d1044e3c1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
// const provider = new firebase.auth.EmailAuthProvider();

export { auth, provider };
export default db;
