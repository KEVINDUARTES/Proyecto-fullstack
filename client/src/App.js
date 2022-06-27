import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CharacterCreate from "./components/CharacterCreate/CharacterCreate";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/character" element={<CharacterCreate />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
