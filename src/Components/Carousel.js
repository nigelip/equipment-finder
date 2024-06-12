import React, { useState, useEffect, forwardRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Carousel = forwardRef((props, ref) => {
  const [texts, setTexts] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "equipment"));
        const locations = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.location) {
            locations.add(data.location);
          }
        });

        setTexts(Array.from(locations));
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 1000); // Duration in milliseconds

    return () => clearInterval(interval);
  }, [texts.length]);

  if (texts.length === 0) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const prevTextIndex = (currentTextIndex - 1 + texts.length) % texts.length;
  const nextTextIndex = (currentTextIndex + 1) % texts.length;

  return (
    <div className="carousel" ref={ref}>
      <div className="text-wrapper">
        <div className="prev">{texts[prevTextIndex]}</div>
        <div className="current">{texts[currentTextIndex]}</div>
        <div className="next">{texts[nextTextIndex]}</div>
      </div>
    </div>
  );
});

export default Carousel;