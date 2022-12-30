import React from "react";
import ParamBox from "./ParamBox";
import Footer from "./Footer";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Users from "./Users";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Settings = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  //  TODO: Save to local storage
  const handleClick = async (pref) => {
    try {
      const response = await axiosPrivate.post(
        "/vote",
        JSON.stringify({ pref, user: auth.user }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }

    console.log(auth.user);
    const data = JSON.stringify({ pref, user: auth.user });
    await fetch("http://localhost:3500/pref", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
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
