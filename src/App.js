import "./App.css";
// import Ad from "./components/Ad";
import Banner from "./components/Banner";
import SavedAds from "./components/SavedAds";
import Login from "./components/Login";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings"

function App() {

  
  
  return (
    <div className="App">
      <Banner />
      <Login />
      <Settings/>
      <AdCard />
      <hr />
      <SavedAds />
    </div>
  );
}

export default App;
