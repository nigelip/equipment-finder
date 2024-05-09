import { React, useState } from "react";
import { results } from "./SearchByLoc";
import { List, Modal, Button } from "antd";

const SearchLocResults = (props) => {
  // const results = props.results;
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
