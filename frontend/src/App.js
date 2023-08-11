import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About/About";
import Home from "./components/Pages/Home/Home";
import Marketplace from "./components/Pages/Marketplace/Marketplace";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/marketplace" element={<Marketplace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
