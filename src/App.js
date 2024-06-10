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
import NotFound from "./Components/NotFound.js";
import DataProvider from "./context/DataProvider.js";
import Catalogue from "./Components/Catalogue.js";

function App() {
  return (
    <Router>
      <div className="App">
        <DataProvider>
          <AuthContextProvider>
            <NavBar />
            <div className="content-wrap">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipment-finder" element={<Home />} />
                <Route path="/loginPage" element={<Login />} />
                <Route
                  path="/searchequipment"
                  element={<SearchByEquipment />}
                />
                <Route
                  path="/searchequipmentresults"
                  element={<SearchEquipmentResults />}
                />
                <Route path="/searchgym" element={<SearchByLoc />} />
                <Route
                  path="/searchgymresults"
                  element={<SearchLocResults />}
                />
                <Route
                  path="/DBEditor"
                  element={
                    <Protected>
                      <DBEditor />
                    </Protected>
                  }
                />
                <Route path="/equipmentCatalogue" element={<Catalogue />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthContextProvider>
        </DataProvider>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
