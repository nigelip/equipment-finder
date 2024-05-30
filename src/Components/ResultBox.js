import React, { useEffect, useState, useRef } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const ResultBox = (props) => {
  const { title, results } = props;
  const [fetchedResults, setFetchedResults] = useState([]);
  // const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const fetchUrls = async () => {
      const updatedResults = await Promise.all(
        results.map(async (item) => {
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
  }, [results]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll(".card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => {
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".card");
        cards.forEach((card) => observer.unobserve(card));
      }
    };
  }, [fetchedResults]);

  return (
    <div className="result-box-overall">
      {fetchedResults.length !== 0 && (
        <div className="resultBox">
          <h1>{title}</h1>
          <div className="cards-container" ref={cardsContainerRef}>
            {fetchedResults.map((item, index) => (
              <div key={index} className="card">
                <img src={item.url} alt={item.name} className="card-img" />
                <div className="card-details">
                  <h2>{item.name}</h2>
                  <h3>{item.brand}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultBox;
