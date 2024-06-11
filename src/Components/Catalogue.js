import React, { useContext, useMemo, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const Catalogue = () => {
  const [uniqueData, setUniqueData] = useState([]);
  const [fetchedResults, setFetchedResults] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "equipment"), (snapshot) => {
      let uniqueItems = {};
      snapshot.forEach((doc) => {
        const { name, type, brand, target } = doc.data();
        const key = `${name}_${type}_${brand}_${target}`;
        if (!uniqueItems[key]) {
          uniqueItems[key] = { id: doc.id, name, type, brand, target };
        }
      });
      const uniqueDataArray = Object.values(uniqueItems);
      setUniqueData(uniqueDataArray);
    });
    return () => unsub();
  }, []); // Empty dependency array to run effect only once on component mount

  // useEffect(() => {
  //   const fetchUrls = async () => {
  //     const updatedResults = await Promise.all(
  //       uniqueData.map(async (item) => {
  //         try {
  //           const url = await getDownloadURL(
  //             ref(
  //               storage,
  //               item.brand + " " + item.type + " " + item.name + ".png"
  //             )
  //           );
  //           return { ...item, url };
  //         } catch (error) {
  //           return { ...item, url: "https://via.placeholder.com/200" };
  //         }
  //       })
  //     );
  //     setFetchedResults(updatedResults);
  //     console.log(updatedResults);
  //   };

  //   fetchUrls();
  // }, [uniqueData]);

  useEffect(() => {
    const fetchUrls = async () => {
      const groupedResults = {}; // Object to store grouped results

      await Promise.all(
        uniqueData.map(async (item) => {
          try {
            const url = await getDownloadURL(
              ref(storage, `${item.brand} ${item.type} ${item.name}.png`)
            );
            // If the brand key doesn't exist in groupedResults, create it with an empty array
            if (!groupedResults[item.target]) {
              groupedResults[item.target] = [];
            }
            // Push the item with its URL to the array corresponding to its brand
            groupedResults[item.target].push({ ...item, url });
          } catch (error) {
            // If there's an error fetching the URL, use a placeholder image
            if (!groupedResults[item.target]) {
              groupedResults[item.target] = [];
            }
            groupedResults[item.target].push({
              ...item,
              url: "https://via.placeholder.com/200",
            });
          }
        })
      );

      setFetchedResults(groupedResults);
      console.log(groupedResults);
    };

    fetchUrls();
  }, [uniqueData]);

  return (
    <div>
      {Object.keys(fetchedResults).map((target) => (
        <div key={target}>
          <h2>{target}</h2>
          <ul>
            {fetchedResults[target].map((item, index) => (
              <li key={index}>
                Name: {item.name}, Type: {item.type}, Brand: {item.brand}
                <img
                  src={item.url}
                  alt={item.name}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
