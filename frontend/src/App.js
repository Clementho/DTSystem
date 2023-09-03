import "./App.css";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import User from "./pages/User";
import EditProfile from "./pages/EditProfile";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/marketplace" element={<Marketplace />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/editprofile" element={<EditProfile />}></Route>

        {/* "id" is can be exchanged for a product id to view said product  */}
        <Route path="/marketplace/:id" element={<ProductDetails />}></Route>

        {/* Redirect to homepage when user tries to access non-existent page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
