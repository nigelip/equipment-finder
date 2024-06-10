import React, { useEffect, useState } from "react";
import { AutoComplete, Button, message } from "antd";
import { db } from "../firebase";
import { SearchOutlined } from "@ant-design/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const SearchByLoc = () => {
  const [equipment, setEquipment] = useState([]);
  const [targetLoc, setTargetLoc] = useState("");
  // const [displayResults, setDisplayResults] = useState(false);
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

  // const handleSearch = () => {
  //   results = [];
  //   for (var i = 0; i < equipment.length; i++) {
  //     if (equipment[i].location === targetLoc) {
  //       results.push(equipment[i]);
  //     }
  //   }
  //   // setresultsList(results);
  //   if (results.length === 0) {
  //     message.error("No results found. Please try again.", 2);
  //     return navigate("/searchgym");
  //   }

  //   message.success(
  //     "Search successful! Redirecting to search results page...",
  //     1.5,
  //     () => navigate("/searchgymresults")
  //     // setDisplayResults(true)
  //   );
  // };

  const handleSearch = () => {
    if (!option.has(targetLoc)) {
      message.error("No results found. Please try again.", 2);
      scrollToTop();
      return navigate("/searchgym");
    }

    localStorage.setItem("locresult", targetLoc);

    message.success(
      "Search successful! Redirecting to search results page...",
      1,
      () => {
        navigate("/searchgymresults");
        scrollToTop();
      }
    );
  };

  const option = new Set([]);
  equipment.forEach((item) => {
    option.add(item["location"]);
  });
  const options = [];
  option.forEach((item) => {
    options.push({ value: item });
  });

  return (
    <>
      <div className="search">
        <h1 className="text-search">Find a Gym</h1>
        <div className="search-container">
          <AutoComplete
            className="custom-search-bar"
            style={{
              width: 300,
            }}
            options={options}
            placeholder="Search Gym"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(value) => {
              setTargetLoc(value.charAt(0).toUpperCase() + value.slice(1));
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
      {/* {displayResults && <SearchLocResults results={results} />} */}
    </>
  );
};

export default SearchByLoc;
