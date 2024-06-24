import React, { useState, useEffect, forwardRef } from 'react';

const Carousel = forwardRef((props, ref) => {
  const [texts] = useState([
    'Nanyang CC', 'City Square Mall', 'Punggol Oasis', 'Katong', 'City Hall',
    'SKH Campus', 'Changi', 'Upper Serangoon', 'Bugis', 'Viio',
    'Grantral Complex', 'Balestier', 'Pasir Panjang', 'Ang Mo Kio', 'Toa Payoh',
    'Chai Chee', 'Tanjong Pagar', 'Kebun Bahru CC', 'Jurong Point', 'Hougang Central',
    'Tampines', 'Keppel', 'Loyang Point', 'Serangoon Gardens', 'Bishan',
    'Hougang CC', 'Kovan', 'NorthShore Plaza', 'Orchard'
  ]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 1000); // Duration in milliseconds

    return () => clearInterval(interval);
  }, [texts.length]);

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
