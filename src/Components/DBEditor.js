import React, { useState, useEffect } from "react";
import { Button, Form, AutoComplete } from "antd";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const filterOption = (input, option) =>
  (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
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
  const { user } = UserAuth();
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

  const handleSubmit = () => {
    // e.preventDefault();
    // console.log(name);
    // console.log(brand);
    // console.log(location);
    // console.log(target);
    // console.log(type);
    try {
      addDoc(collection(db, "equipment"), {
        name: name,
        brand: brand,
        location: location,
        target: target,
        type: type,
      }).then(() => {
        form.resetFields(["name", "brand", "target", "type"]);
      });
    } catch (error) {
      navigate("/");
    }
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
    targetOptions.push({ value: item });
  });

  return (
    <div className="db-editor">

      <div className="top-banner">
        <h1>Database Editor</h1>
      </div>

      <div className="inventoryForm">
      <Form
        className="form-container"
        form={form}
        {...formItemLayout}
        variant="filled"
        onFinish={handleSubmit}
      >
        {/* location input */}

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <AutoComplete
            showSearch
            allowClear
            placeholder="Select location"
            //   optionFilterProp="children"
            onChange={(e) => setLocation(e)}
            filterOption={filterOption}
            options={locOptions}
          />
        </Form.Item>

        {/* Name input */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <AutoComplete
            showSearch
            allowClear
            placeholder="Select equipment"
            // optionFilterProp="children"
            onChange={(e) => setName(e)}
            filterOption={filterOption}
            options={nameOptions}
          />
        </Form.Item>

        {/* Brand input */}

        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <AutoComplete
            showSearch
            allowClear
            placeholder="Select brand"
            //   optionFilterProp="children"
            onChange={(e) => setBrand(e)}
            filterOption={filterOption}
            options={brandOptions}
          />
        </Form.Item>

        <Form.Item
          label="Target"
          name="target"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <AutoComplete
            showSearch
            allowClear
            placeholder="Select target muscle"
            //   optionFilterProp="children"
            onChange={(e) => setTarget(e)}
            filterOption={filterOption}
            options={targetOptions}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <AutoComplete
            showSearch
            allowClear
            placeholder="Select type"
            
            // optionFilterProp="children"
            onChange={(e) => setType(e)}
            filterOption={filterOption}
            options={[
              {
                value: "Cable",
                label: "Cable",
              },
              {
                value: "Plate Loaded",
                label: "Plate Loaded",
              },
              {
                value: "Selectorized",
                label: "Selectorized",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          // wrapperCol={{
          //   offset: 6,
          //   span: 16,
          // }}
        >
          <Button type="primary" htmlType="submit" className="submit-btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
    
  );
};

export default DBEditor;
