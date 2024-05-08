import { React, useState } from "react";
import { results } from "./SearchByEquipment";
import { List, Modal, Button } from "antd";

const SearchEquipmentResults = () => {
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
          defaultPageSize: 5,
        }}
        dataSource={results}
        renderItem={(target) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Button type="link" onClick={() => showModal(target)}>
                  {target.name}
                </Button>
              }
              description={target.location}
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

export default SearchEquipmentResults;
