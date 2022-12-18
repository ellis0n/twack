import "./App.css";
import SavedAds from "./components/SavedAds";
import Register from "./components/Register";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Unauthorized from "./components/Unauthorized";
import Users from "./components/Users";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Public Routes */}
          <Route path = "/" element={<Banner className = "banner"/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />}/>
          


          {/* Private Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/ads" element={<AdCard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/saved" element={<SavedAds />} />
            <Route path="/users" element={<Users/>}/>
          </Route>

          {/* 404 */}
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
