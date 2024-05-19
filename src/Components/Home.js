import { React, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

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
      <h1>Welcome to the AF guide!</h1>
      <p>
        Ever had an equipment you wanted to use that was not available at your
        home gym?
      </p>
      <p>
        With this site, you can finally find out which gyms carry the equipment
        you have been eyeing!
      </p>
      <br />
      <h3>There are currently {option.size} locations to browse</h3>
    </div>
  );
};

export default Home;
