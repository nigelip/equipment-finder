import { React, useState, useEffect } from "react";
import { List, Modal, Button } from "antd";
import { storage } from "../firebase"
import { ref, getDownloadURL } from "firebase/storage";

const ResultBox = (props) => {
  const title = props.title;
  const results = props.results;
  // const photourl = props.photourl;
    

  return (
    <>
      {results.length !== 0 && (
        <div>
          {" "}
          <h1>{title}</h1>
          <br />
          <List
            itemLayout="vertical"
            size="large"
            style={{
              width: "50%",
            }}
            // pagination={{
            //   position,
            //   align,
            //   defaultPageSize: 6,
            // }}
            bordered
            dataSource={results}
            renderItem={(target) => (
              <List.Item
                extra={
                  <img
                    width={272}
                    alt="logo"
                    // src="https://www.precorhomefitness.com/cdn/shop/files/precor-resolute-series-biceps-curl-rsl0204-254396_5000x.jpg?v=1712890829"
                    
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
