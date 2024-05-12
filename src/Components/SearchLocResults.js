import { React, useState, useEffect } from "react";
import { List, Modal, Button } from "antd";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";

const SearchLocResults = () => {
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
      where("location", "==", sessionStorage.getItem("locresult"))
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

  return (
    <div className="resultBox">
      <List
        style={{
          width: "50%",
        }}
        pagination={{
          position,
          align,
          defaultPageSize: 6,
        }}
        bordered
        dataSource={results}
        renderItem={(target) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Button type="link" onClick={() => showModal(target)}>
                  {target.name}
                </Button>
              }
              description={target.target}
            />
          </List.Item>
        )}
      />
      <Modal
        open={open}
        title={currentEquipment.name}
        onOk={handleOk}
        onCancel={handleOk}
        footer={
          <Button key="OK" onClick={handleOk}>
            OK
          </Button>
        }
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
        {/* <p>{MapBox{currentEquipment.lat,{currentEquipment.lng,{currentEquipment.Street)}</p> */}
      </Modal>
    </div>
  );
};

export default SearchLocResults;
