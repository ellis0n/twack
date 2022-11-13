import React from "react";
import { useState } from "react";
import Ads from "./Ads";
import ParamBox from "./ParamBox";


//  Card for holding each individual ad and its child voting options
//  TODO:: Add a comment box component and stylize
const AdCard = () => {
  //  Manages scraped ad 
  const [ads, setAds] = useState([]);
  //  Manages user votes
  const [votes, setVotes] = useState([]) // TODO: Add datetime here or at server?
  //  Handles wait for scraping
  const [running, setRunning] = useState(false);
  //  User parameters TODO: Set user favorites instead of hard coded 
  const [params, setParams] = useState({"location": 0, "category":0});

  //  Handles changes to the requested scrape
  const handleLocation = (e)=>{
    setParams({"location": e.target.value, "category": params.category})
  }
  const handleCategory=(e)=>{
    setParams({'location': params.location, "category": e.target.value})
  }

  const scrapeAds = async()=>{try{
    const currentParams = JSON.stringify(params)
    await fetch("http://localhost:3500/ads", {
    method: "POST",
    headers: { Accept: "application/json", 'Content-Type': 'application/json' },
    body: currentParams
    })
    .then(response => response.json())
    .then(response => {
      response = JSON.parse(response)
      //  Set ad state to response and turn run state on
      setAds(response)
      setRunning(true)
    });
  }
  catch (err) {
    throw err
  }
  }

  const voteAds = async(e)=>{
    const vote = { "id": e.target.id, "vote": e.target.value}
    e.preventDefault();
    setVotes([...votes, vote])
    setAds(ads.filter(ad=> ad.id !== vote.id))
    // If the scraped ad array is empty:
    if (ads.length === 1){
      try{
        let data = "";
        data = votes;
        data.push(vote);
        let jsonData = JSON.stringify(data);
        setAds([]);
        setVotes([]);
        scrapeAds();
        await fetch("http://localhost:3500/user", {
          method: "POST",
          headers: { Accept: "application/json", 'Content-Type': 'application/json' },
          body: jsonData,
          })
          .then(response=>response.json())
          .then(response=>{
            response = JSON.parse(response)
          })
          
      }
        catch (err) {
          throw err
        }

      }
        
  }
  //  Makes request to scrape new ads
  const handleClick = async (e) => {
    //  Accept user parameters
    e.preventDefault();
    switch(e.target.name){
    case "voteAds":
      voteAds(e)
    break;

    case "scrapeAds": 
      scrapeAds();
    break;

    default:
      console.log(e.target)
    };
  }

  return (
    <div className="wrapper">
      <ParamBox handleClick ={handleClick} params={params} handleCategory={handleCategory} handleLocation={handleLocation} name = "scrapeAds"/>

      { running ? 
      ads.map((ad, index)=>
      <div key = {index} style={{display: index === 0 ? 'block' : 'none' }}>
        <Ads 
          id = {ad.id} 
          url = {ad.url}
          title = {ad.title} 
          alt = {ad.desc} 
          src = {ad.img} 
          price ={ad.price}
          desc = {ad.desc}
          index = {index}
          length = {ads.length}/>
          <div className = "vote_wrapper">
            
            <button
              id = {ad.id}
              type = "button"
              value="yes"
              className="yes"
              name="voteAds"
              onClick= {handleClick}>
              Yes
            </button>
            <button
              id = {ad.id}
              type = "button"
              value="no"
              name="voteAds"
              className="no"
              onClick= {handleClick}>
              No
            </button>

          </div>
      </div>)
        :
        <div className = "ad"><h1>Set your preferences to get started.</h1></div>}
    </div>
  );
};


export default AdCard;
