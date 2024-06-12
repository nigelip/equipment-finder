import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import ResultBox from "./ResultBox";

const SearchLocResults = () => {
  const [groupedData, setGroupedData] = useState([]);
  const colRef = collection(db, "equipment");
  useEffect(() => {
    const q = query(
      colRef,
      where("location", "==", localStorage.getItem("locresult"))
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let uniqueItems = {};
      const groupedResults = {};
      querySnapshot.forEach((doc) => {
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
    return () => {
      unsub();
    };
  }, []);
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
    "Cardio",
  ];

  return (
    <div>
      <div className="location-header">
        <h1>{localStorage.getItem("locresult")}</h1>
      </div>
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

export default SearchLocResults;
