import "./App.css";
// import Ad from "./components/Ad";
import Banner from "./components/Banner";
// import Vote from "./components/Vote";
import Footer from "./components/Footer";
import Login from "./components/Login";
import NewAd from "./components/NewAd";
import Delete from "./components/Delete";

function App() {
  return (
    <div className="App">
      <Banner />
      <Login />
      <Delete />
      <NewAd />
      <Footer />
    </div>
  );
}

export default App;
