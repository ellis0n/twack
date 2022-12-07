import "./App.css";
import SavedAds from "./components/SavedAds";
import Login from "./components/Login";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings"
import { Routes, Route } from "react-router-dom";

function App() {


  // Todo: conditionally route "/" to either Login or Ads based on whether user is logged in

  return (
    <div className="App">
      <Routes>
      <Route path ="/" element={ <Login/>}/> 
      <Route path ="/ads" element={<AdCard/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/settings" element={<Settings/>}/>
      <Route path ="/saved" element={<SavedAds/>}/>
      </Routes>
    </div>
  );
}

export default App;
