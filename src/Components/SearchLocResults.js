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
              description={target.target}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default SearchLocResults;
