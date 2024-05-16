import { React, useEffect, useState } from "react";
import { List, Modal, Button } from "antd";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";

const SearchEquipmentResults = () => {
  const position = "bottom";
  const align = "center";
  const [currentEquipment, setcurrentEquipment] = useState([]);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const colRef = collection(db, "equipment");
  const showModal = (target) => {
    setcurrentEquipment(target);
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

  function replaceWPlus(name) {
    var link =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbEkkYmwdvllv3XCCnnUbmEWFnSccRzyk&q=Anytime+Fitness+";
    var replaced = name?.split().join("+");
    return link.concat(replaced);
  }

  return (
    <div className="resultBox">
      <h1>Locations with {sessionStorage.getItem("equipmentresult")}</h1>
      <br />
      <List
        bordered
        style={{ width: "50%" }}
        pagination={{
          position,
          align,
          // defaultPageSize: 5,
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
  );
};

export default SearchEquipmentResults;
