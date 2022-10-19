import './App.css';
import Ad from './components/Ad';
import Banner from './components/Banner';
import Vote from './components/Vote';

function App() {
  return (
    <div className="App">
      <Banner/>
      <Ad/>
      <Vote value="yes"/>
      <Vote value="no"/>
      </div>
  );
}

export default App;
