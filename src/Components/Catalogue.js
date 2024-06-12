import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ResultBox from "./ResultBox";

const Catalogue = () => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "equipment"), (snapshot) => {
      let uniqueItems = {};
      const groupedResults = {};
      snapshot.forEach((doc) => {
        const { name, type, brand, target } = doc.data();
        const key = `${name}_${type}_${brand}_${target}`;
        if (!uniqueItems[key]) {
          uniqueItems[key] = { id: doc.id, name, type, brand, target };
        }
      });
      const uniqueDataArray = Object.values(uniqueItems);
      uniqueDataArray.forEach((item) => {
        if (!groupedResults[item.target]) {
          groupedResults[item.target] = [];
        }
        groupedResults[item.target].push({ ...item });
      });
      setGroupedData(groupedResults);
    });
    return () => unsub();
  }, []); // Empty dependency array to run effect only once on component mount

  // Define the desired order of targets
  const targetOrder = [
    "Chest",
    "Back",
    "Arms",
    "Shoulders",
    "Legs",
    "Glutes",
    "Core",
    "Multipurpose",
  ];

  return (
    <div>
      {targetOrder.map((target) => (
        <div key={target}>
          {groupedData[target] && (
            <ResultBox title={target} results={groupedData[target]} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
