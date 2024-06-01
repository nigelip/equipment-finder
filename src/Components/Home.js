import { React, useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Home = () => {
  const [equipment, setEquipment] = useState([]);
  const heroItemsRef = useRef([]);
  const exclusivelyItemsRef = useRef([]);
  const statsItemsRef = useRef([]);


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
              <Link to="/searchgym" className="search-gym-btn">
                Search Gym
              </Link>
              <Link to="/searchequipment" className="search-equip-btn">
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

      <section id="stats">
        <div className="home-stats">
          <div className="gym-stats" ref={el => statsItemsRef.current[0] = el}>
            <h1>
              <span id="count">{option.size}</span> Gyms available
            </h1>
            <p>Find out what equipment these gyms have!</p>
          </div>
          <div className="equip-stats" ref={el => statsItemsRef.current[1] = el}>
            <h1>
              <span id="count">83</span> Equipment available
            </h1>
            <p>Browse through the extensive list of equipment!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;