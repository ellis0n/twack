import "./App.css";
import Ad from "./components/Ad";
import Banner from "./components/Banner";
import Vote from "./components/Vote";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Banner />
      <Ad />
      <Vote value="deal" />
      <Vote value="nodeal" />
      <Footer />
    </div>
  );
}

export default App;
