import "./App.css";
import Search from "./Components/Search.js";
import SearchResults from "./Components/SearchResults.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DBEditor from "./Components/DBEditor.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/DBEditor" element={<DBEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
