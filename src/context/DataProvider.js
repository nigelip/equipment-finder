import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const snapshot = await db.collection("equipment").get();
  //         const dataList = snapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //         }));
  //         setData(dataList);
  //         console.log(dataList);
  //       } catch (error) {
  //         console.error("Error fetching data from Firebase: ", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  useEffect(() => {
    const equipmentList = [];
    onSnapshot(collection(db, "equipment"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        equipmentList.push({ ...doc.data(), id: doc.id });
      });
      setData(equipmentList);
    });
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
