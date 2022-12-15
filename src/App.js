import "./App.css";
import SavedAds from "./components/SavedAds";
import Register from "./components/Register";
import AdCard from "./components/AdCard";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />

          {/* Private Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<AdCard />} />
            <Route path="/ads" element={<AdCard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/saved" element={<SavedAds />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
