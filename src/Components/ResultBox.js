import { React, useEffect, useState } from "react";
import { List, Modal, Button } from "antd";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const ResultBox = (props) => {
  const title = props.title;
  const results = props.results;
  console.log(results);
  return (
    <>
      {results.length !== 0 && (
        <div className="resultBox">
          {" "}
          <h1>{title}</h1>
          <br />
          <List
            itemLayout="vertical"
            size="large"
            style={{
              width: "50%",
            }}
            bordered
            dataSource={results}
            renderItem={(target) => (
              <List.Item
                extra={
                  <img
                    className="eimg"
                    width={200}
                    src={target.url}
                    alt={target.name}
                  />
                }
              >
                <List.Item.Meta
                  title={target.name}
                  description={<p>{target.brand}</p>}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
};

export default ResultBox;
