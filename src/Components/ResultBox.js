import { React, useEffect, useState } from "react";
import { List } from "antd";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const ResultBox = (props) => {
  const title = props.title;
  const results = props.results;
  const [fetchedResults, setFetchedResults] = useState([]);
  useEffect(() => {
    const fetchUrls = async () => {
      const updatedResults = await Promise.all(
        results.map(async (item) => {
          try {
            const url = await getDownloadURL(
              ref(
                storage,
                item.brand + " " + item.type + " " + item.name + ".png"
              )
            );
            return { ...item, url };
          } catch (error) {
            console.error(`Failed to fetch URL for ${item.name}:`, error);
            return { ...item, url: "https://via.placeholder.com/200" }; // Fallback URL
          }
        })
      );
      setFetchedResults(updatedResults);
    };

    fetchUrls();
  }, [results]); // Re-run if `results` change
  return (
    <>
      {fetchedResults.length !== 0 && (
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
            dataSource={fetchedResults}
            renderItem={(target) => (
              <List.Item
                extra={
                  <img
                    className="eimg"
                    width={200}
                    src={target.url}
                    // alt={target.name}
                  />
                }
              >
                <List.Item.Meta
                  title={target.name}
                  description={<p>{[target.brand, target.type]}</p>}
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
