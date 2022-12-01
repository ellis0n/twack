import "./App.css";
// import Ad from "./components/Ad";
import Banner from "./components/Banner";
import SavedAds from "./components/SavedAds";
import Login from "./components/Login";
import Footer from "./components/Footer";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Banner/>
      <Navbar/>
      <Routes>
      <Route path ="/" element={<AdCard/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/settings" element={<Settings/>}/>
      <Route path ="/saved" element={<SavedAds/>}/>
      </Routes>
    </div>
  );
}

export default App;
