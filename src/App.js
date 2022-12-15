import "./App.css";
import SavedAds from "./components/SavedAds";
import Register from "./components/Register";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings"
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={<Navbar/>}/>
        <Route path ="/register" element={ <Register/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path ="/ads" element={<AdCard/>}/>
        <Route path ="/register" element={<register/>}/>
        <Route path ="/settings" element={<Settings/>}/>
        <Route path ="/saved" element={<SavedAds/>}/>
      </Routes>
    </div>
  );
}

export default App;
