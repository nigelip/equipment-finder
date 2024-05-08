import { React, useState } from "react";
import { results } from "./SearchByLoc";
import { List, Modal, Button } from "antd";

const SearchLocResults = () => {
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  const [currentEquipment, setcurrentEquipment] = useState(results[0]);
  const [open, setOpen] = useState(false);

  const showModal = (target) => {
    setcurrentEquipment(target);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        pagination={{
          position,
          align,
          // defaultPageSize: 5,
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
        <p>Location: {currentEquipment.location}</p>
        <p>Target Muscle: {currentEquipment.target}</p>
        <p>Brand: {currentEquipment.brand}</p>
        <p>Type: {currentEquipment.type}</p>
        {/* <p>{MapBox{currentEquipment.lat,{currentEquipment.lng,{currentEquipment.Street)}</p> */}
      </Modal>
    </>
  );
};

export default SearchLocResults;
