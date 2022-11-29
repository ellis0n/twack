import "./App.css";
// import Ad from "./components/Ad";
import Banner from "./components/Banner";
import SavedAds from "./components/SavedAds";
import Login from "./components/Login";
import Footer from "./components/Footer";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings"
import { Routes, Route } from "react-router-dom";


function App() {


  
  return (
    <div className="App">
      <Banner/>
      <AdCard active={false}/>
      <Login active={false}/>
      <Settings active={false}/>
      <SavedAds active={false}/>
      <Footer/>
    </div>
  );
}

export default App;
