import React, { useContext, useMemo, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const Catalogue = () => {
  const { data } = useContext(DataContext);
  const [fetchedResults, setFetchedResults] = useState([]);
  // Use useMemo to memoize the filtered data
  const uniqueData = useMemo(() => {
    return data.reduce((acc, current) => {
      const x = acc.find(
        (item) =>
          item.name === current.name &&
          item.brand === current.brand &&
          item.type === current.type
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  }, [data]);

  // Group data by brand
  const groupedByTarget = useMemo(() => {
    return uniqueData.reduce((acc, current) => {
      if (!acc[current.target]) {
        acc[current.target] = [];
      }
      acc[current.target].push(current);
      return acc;
    }, {});
  }, [uniqueData]);

  useEffect(() => {
    const fetchUrls = async () => {
      const updatedResults = await Promise.all(
        uniqueData.map(async (item) => {
          try {
            const url = await getDownloadURL(
              ref(
                storage,
                item.brand + " " + item.type + " " + item.name + ".png"
              )
            );
            return { ...item, url };
          } catch (error) {
            return { ...item, url: "https://via.placeholder.com/200" };
          }
        })
      );
      setFetchedResults(updatedResults);
    };

    fetchUrls();
  }, []);

  // Group fetched results by target
  const groupedFetchedResults = useMemo(() => {
    return fetchedResults.reduce((acc, current) => {
      if (!acc[current.target]) {
        acc[current.target] = [];
      }
      acc[current.target].push(current);
      return acc;
    }, {});
  }, [fetchedResults]);

  return (
    <div>
      {Object.keys(groupedFetchedResults).map((target) => (
        <div key={target}>
          <h2>{target}</h2>
          {groupedFetchedResults[target].map((item) => (
            <div key={item.id}>
              <img
                src={item.url}
                alt={`${item.name}`}
                width={200}
                height={200}
              />
              <p>{item.name}</p>
              <p>Brand: {item.brand}</p>
              <p>type: {item.type}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
