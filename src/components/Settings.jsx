import React, { useEffect, useState } from "react";
import ParamBox from "./ParamBox";
import Footer from "./Footer";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Users from "./Users";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Settings = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // const [pref, setPref] = useState([]);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const handleClick = async (pref) => {
    try {
      const response = await axiosPrivate.put(
        "/pref",
        JSON.stringify({ pref, user: auth.user }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Banner className="banner-sm" />
      <Navbar />
      <div className="main_wrapper">
        <ParamBox
          type="setting"
          text="Save preferences."
          handleClick={handleClick}
        />
        <div>
          <button className="login-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Settings;
