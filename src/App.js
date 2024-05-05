import "./App.css";
import SearchByEquipment from "./Components/SearchByEquipment.js";
import SearchEquipmentResults from "./Components/SearchEquipmentResults.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DBEditor from "./Components/DBEditor.js";
import SearchByLoc from "./Components/SearchByLoc.js";
import SearchLocResults from "./Components/SearchLocResults.js";
import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchequipment" element={<SearchByEquipment />} />
          <Route
            path="/searchequipmentresults"
            element={<SearchEquipmentResults />}
          />
          <Route path="/searchgym" element={<SearchByLoc />} />
          <Route path="/searchgymresults" element={<SearchLocResults />} />
          <Route path="/DBEditor" element={<DBEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
