import React from "react";
import { useState } from "react";
import Ads from "./Ads";
const NewAd = () => {

  const [ad, setAd] = useState([]);
  const [running, setRunning] = useState(false);

  const handleClick = async (e) => {
    try{
      await fetch("http://localhost:3500/ads", {
      method: "GET",
      headers: { Accept: "application/json" }})
      .then(response => response.json())
      .then(response =>{
        response = JSON.parse(response)
        setAd(response)
        setRunning(true)
      }) 
      
      
    }
    catch (err) {
      throw err
    }

  };

  return (
    <div className="wrapper">
      {/* {console.log(ad)} */}
      <button method="get" onClick={handleClick}>
        Fetch data
      </button> 
      { running ? 
        <Ads 
          id = {ad[0].id} 
          url = {ad[0].title} 
          alt = {ad[0].desc} 
          src = {ad[0].img} 
          price ={ad[0].price}/>
        :
        <div>No ad</div>}
    </div>
  );
};

export default NewAd;
