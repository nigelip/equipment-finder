import { React, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Home = () => {
  const [equipment, setEquipment] = useState([]);
  useEffect(() => {
    const equipmentList = [];
    onSnapshot(collection(db, "equipment"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        equipmentList.push({ ...doc.data(), id: doc.id });
      });
      setEquipment(equipmentList);
    });
  }, []);

  const option = new Set([]);
  equipment.forEach((item) => {
    option.add(item["location"]);
  });

  return (
    <div className="home">

      <div className="home-welcome">
        <h1>Welcome to 
          <span id="brand-name"> AF Guide.</span>
          </h1>
        <p>Ever had an equipment you wanted to use that was not available at your
        home gym? With this site, you can finally find out which gyms carry the equipment
        you have been eyeing!</p>
        <div className="button-container">
          <Link to="/searchgym" className="search-gym-btn">Search Gym</Link>
          <Link to="/searchequipment" className="search-equip-btn">Search Equipment</Link>
        </div>
      </div>

      <div className="home-exclusively-made">
        <h1><span id="exclusively">Exclusively</span> Made</h1>
        <p>This project is made for AF members who enjoy exploring many AF gyms islandwide.</p>
      </div>
      <div className="home-stats">
        <div className="gym-stats">
          <h1><span id="gym-count">{option.size}</span> Gyms available</h1>
          <p>Find out what equipment these gyms have!</p>
        </div>
        <div className="equip-stats">
          <h1><span id="equip-count">83</span> Equipments available</h1>
          <p>Browse through the extensive list of equipments!</p>
        </div>
      </div>
      <div></div>
      <br />

    </div>
  );
};

export default Home;
