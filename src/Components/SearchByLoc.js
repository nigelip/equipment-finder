import React, { useEffect, useState } from "react";
import { AutoComplete, Button, message } from "antd";
import { db } from "../firebase";
import { SearchOutlined } from "@ant-design/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

let results = [];

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
      return navigate("/searchgym");
    }

    sessionStorage.setItem("locresult", targetLoc);

    message.success(
      "Search successful! Redirecting to search results page...",
      1.5,
      () => navigate("/searchgymresults")
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
            <AutoComplete
            style={{
                width: 200,
            }}
            options={options}
            placeholder="Search Gym"
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onChange={(value) => {
                setTargetLoc(value);
            }}
            optionHeight={4}
            size="large"
            />
            <Button
            type="primary"
            className="search-button"
            size="large"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            />
        </div>
        {/* {displayResults && <SearchLocResults results={results} />} */}
    </>
  );
};

export default SearchByLoc;

export { results };
