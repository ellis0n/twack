import React from "react";
import ParamBox from "./ParamBox";
import Footer from "./Footer";

const Settings = () => {
  //  TODO: Save to local storage
  const handleClick = async (pref) => {
    const data = JSON.stringify(pref);
    await fetch("http://localhost:3500/pref", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    }).then((response) => response.json());
  };

  return (
    <div className="main_wrapper">
      <ParamBox
        type="setting"
        text="Save preferences."
        handleClick={handleClick}
      />
      <Footer />
    </div>
  );
};

export default Settings;