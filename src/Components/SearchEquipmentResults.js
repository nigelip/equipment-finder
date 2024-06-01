import React, { useEffect, useState } from "react";
import { List, Button, message } from "antd";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import FullScreenModal from "./FullScreenModal";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBullseye,
  FaDumbbell,
  FaInfoCircle,
  s,
} from "react-icons/fa";

const SearchEquipmentResults = () => {
  const position = "bottom";
  const align = "center";
  const [currentEquipment, setCurrentEquipment] = useState([]);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [link, setLink] = useState("");
  const colRef = collection(db, "equipment");
  const navigate = new useNavigate();

  const onClick = () => {
    sessionStorage.setItem("locresult", currentEquipment.location);

    message.success(
      "Search successful! Redirecting to search results page...",
      1.5,
      () => navigate("/searchgymresults")
    );
  };

  const showModal = (target) => {
    setCurrentEquipment(target);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const q = query(
      colRef,
      where("name", "==", sessionStorage.getItem("equipmentresult"))
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setResults(items);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const fetchUrl = async () => {
      if (currentEquipment) {
        try {
          const url = await getDownloadURL(
            ref(
              storage,
              `${currentEquipment.brand} ${currentEquipment.type} ${currentEquipment.name}.png`
            )
          );
          setLink(url);
        } catch (error) {
          console.error(
            `Failed to fetch URL for ${currentEquipment.name}:`,
            error
          );
          setLink("https://via.placeholder.com/200"); // Fallback URL
        }
      }
    };

    fetchUrl();
  }, [currentEquipment]);

  function replaceWPlus(name) {
    var link =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbEkkYmwdvllv3XCCnnUbmEWFnSccRzyk&q=Anytime+Fitness+";
    var replaced = name?.split().join("+");
    return link.concat(replaced);
  }

  return (
    <div>
      <div className="equipment-header">
        <h1>{sessionStorage.getItem("equipmentresult")}</h1>
      </div>
      <div className="result-box-overall">
        <div className="resultBox">
          <h1>Locations</h1>
          <div>
            <List
              className="result-box-list"
              dataSource={results}
              renderItem={(target) => (
                <List.Item className="location-list-item">
                  <div className="location-list-item-name">
                    <p>
                      <b id="location-name">{target.location}</b>
                    </p>
                    <p>{target.brand}</p>
                  </div>

                  <Button
                    className="show-modal-btn"
                    type="link"
                    onClick={() => showModal(target)}
                  >
                    <FaInfoCircle />
                  </Button>
                </List.Item>
              )}
            />
          </div>

          <FullScreenModal
            open={open}
            onClose={handleClose}
            title={currentEquipment.name}
          >
            <div className="modal-top-container">
              <div className="modal-img-container">
                <img
                  src={link}
                  alt="logo"
                  style={{ height: "200px", width: "200px" }}
                />
              </div>

              <div className="modal-details-container">
                <div className="header-names">
                  <h2>{currentEquipment.brand}</h2>

                  <h1>{currentEquipment.name}</h1>
                </div>

                <div className="details-container">
                  <div id="details">
                    <FaMapMarkerAlt />
                    <p>{currentEquipment.location}</p>
                  </div>

                  <div id="details">
                    <FaBullseye />
                    <p>{currentEquipment.target}</p>
                  </div>

                  <div id="details">
                    <FaDumbbell />
                    <p>{currentEquipment.type}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-bottom-container">
              <iframe
                title="mapBox"
                style={{
                  border: "1px solid",
                  loading: "lazy",
                }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={replaceWPlus(currentEquipment.location)}
              ></iframe>
            </div>

            <div className="modal-links-container">
              <button className="view-equip-btn" onClick={onClick}>
                View {currentEquipment.location} equipment
              </button>
            </div>
          </FullScreenModal>
        </div>
      </div>
    </div>
  );
};

export default SearchEquipmentResults;
