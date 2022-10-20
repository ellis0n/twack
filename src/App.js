import "./App.css";
// import Ad from "./components/Ad";
import Banner from "./components/Banner";
// import Vote from "./components/Vote";
import Footer from "./components/Footer";
import NewAd from "./components/NewAd";
import Scrape from "./components/Scrape";

function App() {
  return (
    <div className="App">
      <Banner />
      <Scrape />
      <NewAd />
      <Footer />
    </div>
  );
}

export default App;
