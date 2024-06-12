import React, { useEffect, useState } from "react";
import { AutoComplete, Button, message } from "antd";
import { db } from "../firebase";
import { SearchOutlined } from "@ant-design/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSearch = () => {
    if (!option.has(targetEquipment)) {
      message.error("No results found. Please try again.", 2);
      scrollToTop();
      return navigate("/searchequipment");
    }

    localStorage.setItem("equipmentResult", targetEquipment);
    localStorage.setItem("equipmentBrand", false);
    localStorage.setItem("equipmentType", false);

    message.success(
      "Search successful! Redirecting to search results page...",
      1,
      () => {
        navigate("/searchequipmentresults");
        scrollToTop();
      }
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
        <h1 className="text-search">Find an Equipment</h1>
        <div className="search-container">
          <AutoComplete
            className="custom-search-bar"
            style={{
              width: 300,
            }}
            options={options}
            placeholder="Search Equipment"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(value) => {
              setTargetEquipment(
                value.charAt(0).toUpperCase() + value.slice(1)
              );
            }}
            optionHeight={4}
            size="large"
          />
          <Button
            type="primary"
            className="search-button"
            size="large"
            icon={<SearchOutlined className="search-icon" />}
            onClick={() => {
              handleSearch();
              scrollToTop();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SearchByEquipment;
