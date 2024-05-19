import { React, useState } from "react";
import { List, Modal, Button } from "antd";
const ResultBox = (props) => {
  const title = props.title;
  const results = props.results;

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
                    width={272}
                    alt="logo"
                    // src="https://www.precorhomefitness.com/cdn/shop/files/precor-resolute-series-biceps-curl-rsl0204-254396_5000x.jpg?v=1712890829"
                    // src={target["name"].concat(".jpg")}
                    src={`../img/${target.brand.concat(" ", target.name)}.png`}
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