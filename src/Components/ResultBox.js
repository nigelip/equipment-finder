import { React, useEffect, useState } from "react";
import { List, Modal, Button } from "antd";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const ResultBox = (props) => {
  const title = props.title;
  const results = props.results;
  //const pic = props.pic;
  const pic=new Map()

  console.log(results);
  return (
    <>
      {results.length !== 0 && (
        <div className="resultBox">
          {" "}
          <h1>{title}</h1>
          <p>{pic}</p>
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
                    // src={target?.url}
                    alt="logo"
                    // src={`../img/${target.brand.concat(" ", target.name)}.png`}
                     src={`${pic?.get(target.name)}`} // the question mark here "helps" the pic appear but not all the time
                    // the question mark here "helps" the pic appear but not all the time
                    // src="https://firebasestorage.googleapis.com/v0/b/equipment-finder-bcec5.appspot.com/o/Life%20Fitness%20Chest-Supported%20Row.png?alt=media&token=c6a28b26-ddb1-4d79-8d04-72f16da875d2"
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