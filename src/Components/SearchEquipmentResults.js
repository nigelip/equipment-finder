import { React, useEffect, useState } from "react";
import { List, Modal, Button } from "antd";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const SearchEquipmentResults = () => {
  const position = "bottom";
  const align = "center";
  const [currentEquipment, setCurrentEquipment] = useState([]);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [link, setLink] = useState("");
  const colRef = collection(db, "equipment");
  const showModal = (target) => {
    setCurrentEquipment(target);
    setOpen(true);
  };

  const handleOk = () => {
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
        <h1>
        {sessionStorage.getItem("equipmentresult")}
        </h1>
    </div>
  
    <div className="resultBox">
      <h1 style={{ backgroundColor: "#574999", color: "white" }}>
        Locations with {sessionStorage.getItem("equipmentresult")}
      </h1>
      <br />
      <List
        bordered
        style={{ width: "50%" }}
        pagination={{
          position,
          align,
          defaultPageSize: 5,
        }}
        dataSource={results}
        renderItem={(target) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Button type="link" onClick={() => showModal(target)}>
                  <h2>{target.location}</h2>
                </Button>
              }
              description={target.name}
            />
          </List.Item>
        )}
      />
      <Modal
        open={open}
        title={currentEquipment.name}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
      >
        <p>
          Location: <b>{currentEquipment.location}</b>
        </p>
        <p>
          Target Muscle: <b>{currentEquipment.target}</b>
        </p>
        <p>
          Brand: <b>{currentEquipment.brand}</b>
        </p>
        <p>
          Type: <b>{currentEquipment.type}</b>
        </p>
        <br />
        <img
          src={link}
          alt="logo"
          style={{ height: "200px", width: "200px" }}
        />
        <iframe
          title="mapBox"
          style={{
            width: "auto",
            height: "40vh",
            style: "border:1",
            loading: "lazy",
          }}
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src={replaceWPlus(currentEquipment.location)}
        ></iframe>
      </Modal>
    </div>
    </div>
  );
};

export default SearchEquipmentResults;
