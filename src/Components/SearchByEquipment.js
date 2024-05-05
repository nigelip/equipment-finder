import React, { useEffect, useState } from "react";
import { AutoComplete, Button, message } from "antd";
import { db } from "../firebase";
import { SearchOutlined } from "@ant-design/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

let results = [];

const SearchByEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [targetEquipment, setTargetEquipment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const equipmentList = [];
    onSnapshot(collection(db, "equipment"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        equipmentList.push({ ...doc.data(), id: doc.id });
      });
      setEquipment(equipmentList);
    });
  }, []);

  const handleSearch = () => {
    results = [];
    for (var i = 0; i < equipment.length; i++) {
      if (equipment[i].name == targetEquipment) {
        //dynamic variable here:name
        results.push(equipment[i]);
      }
    }
    // setresultsList(results);
    if (results.length === 0) {
      message.error("No results found. Please try again.", 2);
      return navigate("/");
    }

    message.success(
      "Search successful! Redirecting to search results page...",
      1.5,
      () => navigate("/searchequipmentresults")
    );
  };

  const option = new Set([]);
  equipment.forEach((item) => {
    option.add(item["name"]);
  });
  const options = [];
  option.forEach((item) => {
    options.push({ value: item });
  });

  return (
    <>
      <div className="search">
        <AutoComplete
          style={{
            width: 200,
          }}
          options={options}
          placeholder="Search Equipment"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={(value) => {
            setTargetEquipment(value);
          }}
          optionHeight={4}
          size="large"
        />
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchByEquipment;

export { results };
