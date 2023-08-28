import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About/About";
import Home from "./components/Pages/Home/Home";
import Marketplace from "./components/Pages/Marketplace/Marketplace";
import User from "./components/Pages/User/UserPage";
import EditProfile from "./components/Pages/User/EditProfile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/marketplace" element={<Marketplace />}></Route>
        {/* TODO CHANGE THIS LATER */}
        <Route path="/user" element={<User />}></Route>
        <Route path="/editprofile" element={<EditProfile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
