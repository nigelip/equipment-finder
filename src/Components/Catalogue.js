import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import ResultBox from "./ResultBox";
import LoadingAnimation from "./LoadingAnimation"; // Import your loading animation component

const Catalogue = () => {
  const [backResults, setBackResults] = useState([]);
  const [legsResults, setLegsResults] = useState([]);
  const [chestResults, setChestResults] = useState([]);
  const [armsResults, setArmsResults] = useState([]);
  const [glutesResults, setGlutesResults] = useState([]);
  const [multipurposeResults, setMultipurposeResults] = useState([]);
  const [shouldersResults, setShouldersResults] = useState([]);
  const [coreResults, setCoreResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await new Promise((resolve) => {
        const unsub = onSnapshot(collection(db, "equipment"), (snapshot) => {
          resolve(snapshot);
          unsub(); // Unsubscribe after getting the snapshot
        });
      });

      const uniqueItems = {};
      const backItems = [];
      const legsItems = [];
      const chestItems = [];
      const armsItems = [];
      const glutesItems = [];
      const multipurposeItems = [];
      const shouldersItems = [];
      const coreItems = [];

      await Promise.all(snapshot.docs.map(async (doc) => {
        const item = doc.data();
        const key = `${item.name}_${item.type}_${item.brand}_${item.target}`;
        if (!uniqueItems[key]) {
          uniqueItems[key] = true;
          try {
            const url = await getDownloadURL(
              ref(storage, `${item.brand} ${item.type} ${item.name}.png`)
            );
            item.url = url;
          } catch (error) {
            item.url = "https://via.placeholder.com/200";
          }

          switch (item.target) {
            case "Back":
              backItems.push(item);
              break;
            case "Legs":
              legsItems.push(item);
              break;
            case "Chest":
              chestItems.push(item);
              break;
            case "Arms":
              armsItems.push(item);
              break;
            case "Glutes":
              glutesItems.push(item);
              break;
            case "Multipurpose":
              multipurposeItems.push(item);
              break;
            case "Shoulders":
              shouldersItems.push(item);
              break;
            case "Core":
              coreItems.push(item);
              break;
            default:
              break;
          }
        }
      }));

      setBackResults(backItems);
      setLegsResults(legsItems);
      setChestResults(chestItems);
      setArmsResults(armsItems);
      setGlutesResults(glutesItems);
      setMultipurposeResults(multipurposeItems);
      setShouldersResults(shouldersItems);
      setCoreResults(coreItems);
    };

    const loadWithDelay = async () => {

      window.scrollTo(0, 0);

      setLoading(true);
      const MIN_LOADING_TIME = 500; // Minimum loading time in milliseconds

      const fetchDataPromise = fetchData();
      const delayPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));

      await Promise.all([fetchDataPromise, delayPromise]);
      setLoading(false);

      // Scroll to the top of the page
      
    };

    loadWithDelay();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingAnimation /> // Show loading animation while loading
      ) : (
        <>
          <ResultBox title="Back" results={backResults} />
          <ResultBox title="Chest" results={chestResults} />
          <ResultBox title="Legs" results={legsResults} />
          <ResultBox title="Arms" results={armsResults} />
          <ResultBox title="Glutes" results={glutesResults} />
          <ResultBox title="Multipurpose" results={multipurposeResults} />
          <ResultBox title="Shoulders" results={shouldersResults} />
          <ResultBox title="Core" results={coreResults} />
        </>
      )}
    </div>
  );
};

export default Catalogue;
