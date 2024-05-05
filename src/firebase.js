import { initializeApp } from "firebase/app";
import {
  collection,
  onSnapshot,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { useRef } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAvUNjYiQdZxk42YS7BHaBcaQNK2W33BLA",
  authDomain: "equipment-finder-bcec5.firebaseapp.com",
  projectId: "equipment-finder-bcec5",
  storageBucket: "equipment-finder-bcec5.appspot.com",
  messagingSenderId: "629522469518",
  appId: "1:629522469518:web:3e1e8cc69914d905c76fdf",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "equipment");

//real time collection data
const equipment = [];
onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    equipment.push({ ...doc.data(), id: doc.id });
  });
  console.log(equipment);
});
// const option = new Set([]);
// equipment.forEach((item) => {
//   option.add(item["name"]);
// });
// const equipmentType = [];
// option.forEach((item) => {
//   equipmentType.push({ value: item });
// });

// adding equipment
// const addEquipmentForm = document.querySelector(".add");
// const addEquipmentForm = useRef(".add");
// addEquipmentForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   addDoc(colRef, {
//     name: addEquipmentForm.name.value,
//     brand: addEquipmentForm.brand.value,
//     location: addEquipmentForm.location.value,
//     target: addEquipmentForm.target.value,
//     type: addEquipmentForm.type.value,
//   }).then(() => {
//     addEquipmentForm.reset();
//   });
// });

export { db, colRef };
