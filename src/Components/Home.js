import { React, useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Carousel from './Carousel';

const Home = () => {
  const [equipment, setEquipment] = useState([]);
  const heroItemsRef = useRef([]);
  const exclusivelyItemsRef = useRef([]);
  const statsItemsRef = useRef([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const equipmentList = [];
    onSnapshot(collection(db, "equipment"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        equipmentList.push({ ...doc.data(), id: doc.id });
      });
      setEquipment(equipmentList);
    });

    const observerOptions = {
      threshold: 0.1,
    };

    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    const allItems = [
      ...heroItemsRef.current,
      ...exclusivelyItemsRef.current,
      ...statsItemsRef.current,
      carouselRef.current
    ];

    allItems.forEach(item => {
      if (item) {
        item.classList.add('hidden-item');
        observer.observe(item);
      }
    });

    return () => {
      allItems.forEach(item => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  const option = new Set([]);
  equipment.forEach((item) => {
    option.add(item["location"]);
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home">
      <section id="hero">
        <div className="home-welcome" ref={el => heroItemsRef.current[0] = el}>
            <h1 ref={el => heroItemsRef.current[1] = el}>
              Welcome to <span id="brand-name">AF Guide.</span>
            </h1>
            <p ref={el => heroItemsRef.current[2] = el}>
              Ever had an equipment you wanted to use that was not available at
              your home gym? With this site, you can finally find out which gyms
              carry the equipment you have been eyeing!
            </p>
            <div className="button-container" ref={el => heroItemsRef.current[3] = el}>
              <Link to="/searchgym" className="search-gym-btn" onClick={scrollToTop}>
                Search Gym
              </Link>
              <Link to="/searchequipment" className="search-equip-btn" onClick={scrollToTop}>
                Search Equipment
              </Link>
            </div>
        </div>
      </section>

      <section id="exclusively">
        <div className="home-exclusively-made" ref={el => exclusivelyItemsRef.current[0] = el}>
          <h1>
            <span id="exclusively-text">Exclusively</span> Made
          </h1>
          <p ref={el => exclusivelyItemsRef.current[1] = el}>
            This project is made for AF members who enjoy exploring many AF gyms
            islandwide.
          </p>
        </div>
      </section>

      <section id="find-your-gym">
        <h1>FIND YOUR GYM</h1>
        <Carousel ref={carouselRef} />
        <p>
          <span id="count">{option.size} </span>
          GYMS AVAILABLE
          </p>
        <Link to="/searchgym" className="search-gym-btn" onClick={scrollToTop}>
              Search Gym
          </Link>
      </section>

      <section id="find-your-equipment">
        <h1>FIND YOUR EQUIPMENT</h1>
        
      </section>
      
      

    </div>
  );
};

export default Home;
