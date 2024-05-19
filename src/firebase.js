import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvUNjYiQdZxk42YS7BHaBcaQNK2W33BLA",
  authDomain: "equipment-finder-bcec5.firebaseapp.com",
  projectId: "equipment-finder-bcec5",
  storageBucket: "equipment-finder-bcec5.appspot.com",
  messagingSenderId: "629522469518",
  appId: "1:629522469518:web:3e1e8cc69914d905c76fdf",
};

//init firebase app
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore(app);
const storage = getStorage(app);
//collection ref
const colRef = collection(db, "equipment");

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//real time collection data
// const equipment = [];
// onSnapshot(colRef, (snapshot) => {
//   snapshot.docs.forEach((doc) => {
//     equipment.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(equipment);
// });

export { db, colRef, auth, provider, storage };