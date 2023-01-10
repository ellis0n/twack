import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Banner from "./Banner";
import Navbar from "./Navbar";
import User from "./User";
import Footer from "./Footer";

const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="homepage">
      <Banner className="banner-sm" />
      <Navbar />
      <User />
      <h3> Homepage</h3>
      <br />
      <Link to="/ads">Go to Ads</Link>
      <br />
      <Link to="/saved">Go to Saved Ads</Link>
      <br />
      <Link to="/settings">Go to Settings</Link>
      <br />
      <Link to="/users">Go to Users</Link>
      <div>
        <button className="login-btn" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
