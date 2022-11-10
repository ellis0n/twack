import "./App.css";
// import Ad from "./components/Ad";
import Banner from "./components/Banner";
// import Vote from "./components/Vote";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AdCard from "./components/AdCard";

function App() {
  return (
    <div className="App">
      <Banner />
      <Login />
      <AdCard />
      <Footer />
    </div>
  );
}

export default App;
