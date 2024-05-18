import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import ResultBox from "./ResultBox";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { List } from "antd";

const SearchLocResults = () => {
  const [backResults, setBackResults] = useState([]);
  const [legsResults, setLegsResults] = useState([]);
  const [chestResults, setChestResults] = useState([]);
  const [armsResults, setArmsResults] = useState([]);
  const [glutesResults, setGlutesResults] = useState([]);
  const [multipurposeResults, setMultipurposeResults] = useState([]);
  const [shouldersResults, setShouldersResults] = useState([]);
  const [coreResults, setCoreResults] = useState([]);
  const [backPics, setBackPics] = useState(new Map());
  const [legsPics, setLegsPics] = useState(new Map());
  const [chestPics, setChestPics] = useState(new Map());
  const [armsPics, setArmsPics] = useState(new Map());
  const [glutesPics, setGlutesPics] = useState(new Map());
  const [multipurposePics, setMultipurposePics] = useState(new Map());
  const [shouldersPics, setShouldersPics] = useState(new Map());
  const [corePics, setCorePics] = useState(new Map());
  const colRef = collection(db, "equipment");
  useEffect(() => {
    const q = query(
      colRef,
      where("location", "==", sessionStorage.getItem("locresult"))
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const backItems = [];
      const legsItems = [];
      const chestItems = [];
      const armsItems = [];
      const glutesItems = [];
      const multipurposeItems = [];
      const shouldersItems = [];
      const coreItems = [];
      const backpic = new Map();
      const legspic = new Map();
      const chestpic = new Map();
      const armspic = new Map();
      const glutespic = new Map();
      const multipurposepic = new Map();
      const shoulderspic = new Map();
      const corepic = new Map();
      querySnapshot.forEach((doc) => {
        let mp = doc.data();
        if (doc.data().target === "Back") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          backItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   backpic.set(doc.data().name, url);
          // });
        } else if (doc.data().target === "Legs") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          legsItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   legspic.set(doc.data().name, url);
          // });
        } else if (doc.data().target === "Chest") {
          // chestItems.push(doc.data());
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   chestpic.set(doc.data().name, url);
          // });
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          chestItems.push(mp);
        } else if (doc.data().target === "Arms") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          armsItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   armspic.set(doc.data().name, url);
          // });
        } else if (doc.data().target === "Glutes") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          glutesItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   glutespic.set(doc.data().name, url);
          // });
        } else if (doc.data().target === "Multipurpose") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          multipurposeItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   multipurposepic.set(doc.data().name, url);
          // });
        } else if (doc.data().target === "Shoulders") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          shouldersItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   shoulderspic.set(doc.data().name, url);
          // });
        } else if (doc.data().target === "Core") {
          getDownloadURL(
            ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          ).then((url) => {
            mp["url"] = url;
            // console.log(mp);
          });
          coreItems.push(mp);
          // getDownloadURL(
          //   ref(storage, doc.data().brand + " " + doc.data().name + ".png")
          // ).then((url) => {
          //   corepic.set(doc.data().name, url);
          // });
        }
      });
      setBackResults(backItems);
      setLegsResults(legsItems);
      setChestResults(chestItems);
      setArmsResults(armsItems);
      setGlutesResults(glutesItems);
      setMultipurposeResults(multipurposeItems);
      setShouldersResults(shouldersItems);
      setCoreResults(coreItems);
      // setBackPics(backpic);
      // setLegsPics(legspic);
      // setChestPics(chestpic);
      // setArmsPics(armspic);
      // setGlutesPics(glutespic);
      // setMultipurposePics(multipurposepic);
      // setShouldersPics(shoulderspic);
      // setCorePics(corepic);
      // console.log(backpic);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      <h1 style={{ backgroundColor: "#574999", color: "white" }}>
        {sessionStorage.getItem("locresult")}
      </h1>
      <br />
      {/* <ResultBox title="Back" results={backResults} />
      <ResultBox title="Chest" results={backResults} />
      <ResultBox title="Legs" results={backResults} />
      <ResultBox title="Arms" results={backResults} />
      <ResultBox title="Glutes" results={backResults} />
      <ResultBox title="Multipurpose" results={backResults} />
      <ResultBox title="Shoulders" results={backResults} />
      <ResultBox title="Core" results={backResults} /> */}

      <ResultBox title="Back" results={backResults} />
      <ResultBox title="Chest" results={chestResults} />
      <ResultBox title="Legs" results={legsResults} />
      <ResultBox title="Arms" results={armsResults} />
      <ResultBox title="Glutes" results={glutesResults} />
      <ResultBox
        title="Multipurpose"
        results={multipurposeResults}
        pic={multipurposePics}
      />
      <ResultBox
        title="Shoulders"
        results={shouldersResults}
        pic={shouldersPics}
      />
      <ResultBox title="Core" results={coreResults} pic={corePics} />
    </div>
  );
};

export default SearchLocResults;
