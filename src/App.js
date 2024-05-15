import "./App.css";
import SearchByEquipment from "./Components/SearchByEquipment.js";
import SearchEquipmentResults from "./Components/SearchEquipmentResults.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DBEditor from "./Components/DBEditor.js";
import SearchByLoc from "./Components/SearchByLoc.js";
import SearchLocResults from "./Components/SearchLocResults.js";
import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";
import AppFooter from "./Components/Footer.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import Login from "./Components/Login.js";
import Protected from "./Components/Protected.js";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthContextProvider>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginPage" element={<Login />} />
            <Route path="/searchequipment" element={<SearchByEquipment />} />
            <Route
              path="/searchequipmentresults"
              element={<SearchEquipmentResults />}
            />
            <Route path="/searchgym" element={<SearchByLoc />} />
            <Route path="/searchgymresults" element={<SearchLocResults />} />
            <Route
              path="/DBEditor"
              element={
                <Protected>
                  <DBEditor />
                </Protected>
              }
            />
          </Routes>
          
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loginPage" element={<Login />} />
              <Route path="/searchequipment" element={<SearchByEquipment />} />
              <Route
                path="/searchequipmentresults"
                element={<SearchEquipmentResults />}
              />
              <Route path="/searchgym" element={<SearchByLoc />} />
              <Route path="/searchgymresults" element={<SearchLocResults />} />
              <Route
                path="/DBEditor"
                element={
                  <Protected>
                    <DBEditor />
                  </Protected>
                }
              />
            </Routes>
          </div>

        </AuthContextProvider>

        <AppFooter className="appFooter" />
      </div>
    </Router>
  );
}

export default App;
