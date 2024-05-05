import React, { useState, useEffect } from "react";
import { Button, Form, Select } from "antd";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

const filterOption = (input, option) =>
  (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const DBEditor = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [type, setType] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const equipmentList = [];
    onSnapshot(collection(db, "equipment"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        equipmentList.push({ ...doc.data(), id: doc.id });
      });
      setEquipment(equipmentList);
    });
  }, []);

  const handleSubmit = () => {
    // e.preventDefault();
    console.log(name);
    console.log(brand);
    console.log(location);
    console.log(target);
    console.log(type);
    addDoc(collection(db, "equipment"), {
      name: name,
      brand: brand,
      location: location,
      target: target,
      type: type,
    }).then(() => {
      form.resetFields();
    });
  };

  const nameOption = new Set([]);
  equipment.forEach((item) => {
    nameOption.add(item["name"]);
  });
  const nameOptions = [];
  nameOption.forEach((item) => {
    nameOptions.push({ value: item });
  });

  const brandOption = new Set([]);
  equipment.forEach((item) => {
    brandOption.add(item["brand"]);
  });
  const brandOptions = [];
  brandOption.forEach((item) => {
    brandOptions.push({ value: item });
  });

  const locOption = new Set([]);
  equipment.forEach((item) => {
    locOption.add(item["location"]);
  });
  const locOptions = [];
  locOption.forEach((item) => {
    locOptions.push({ value: item });
  });

  const targetOption = new Set([]);
  equipment.forEach((item) => {
    targetOption.add(item["target"]);
  });
  const targetOptions = [];
  targetOption.forEach((item) => {
    targetOptions.push({ value: item, label: item.toUpperCase() });
  });

  return (
    <Form
      form={form}
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
      }}
      onFinish={handleSubmit}
      //   onFinishFailed={console.log("failed to update")}
    >
      {/* Name input */}
      <Form.Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select equipment"
          //   optionFilterProp="children"
          onChange={(e) => setName(e)}
          filterOption={filterOption}
          options={nameOptions}
        />
      </Form.Item>

      {/* Brand input */}

      <Form.Item
        label="brand"
        name="brand"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select brand"
          //   optionFilterProp="children"
          onChange={(e) => setBrand(e)}
          filterOption={filterOption}
          options={brandOptions}
        />
      </Form.Item>

      {/* location input */}

      <Form.Item
        label="location"
        name="location"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select location"
          //   optionFilterProp="children"
          onChange={(e) => setLocation(e)}
          filterOption={filterOption}
          options={locOptions}
        />
      </Form.Item>

      <Form.Item
        label="target"
        name="target"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select target muscle"
          //   optionFilterProp="children"
          onChange={(e) => setTarget(e)}
          filterOption={filterOption}
          options={targetOptions}
        />
      </Form.Item>

      <Form.Item
        label="type"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select type"
          //   optionFilterProp="children"
          onChange={(e) => setType(e)}
          filterOption={filterOption}
          options={[
            {
              value: "cable",
              label: "Cable",
            },
            {
              value: "plate loaded",
              label: "Plate Loaded",
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DBEditor;