import React from "react";
import { useState } from "react";
import Ads from "./Ads";
import ParamBox from "./ParamBox";
import Footer from "./Footer.jsx";

//  Card for holding each individual ad and its child voting options
//  TODO:: Add a comment box component and stylize
const AdCard = () => {
  //  Manages scraped ad
  const [ads, setAds] = useState([]);
  //  Manages user votes
  const [votes, setVotes] = useState([]); // TODO: Add datetime here or at server?
  //  Handles wait for scraping
  const [running, setRunning] = useState(false);
  //  User parameters TODO: Make dynamic based on user data
  const [params, setParams] = useState({ location: 0, category: 0 });

  //  Handles changes to search location and category parameters
  const handleLocation = (e) => {
    setParams({ location: e.target.value, category: params.category });
  };
  const handleCategory = (e) => {
    setParams({ location: params.location, category: e.target.value });
  };

  //  Request handler for scraping ads
  // TODO: send save data if ready
  const scrapeAds = async () => {
    try {
      // JSON parameter state, send to server
      const data = JSON.stringify(params);
      await fetch("http://localhost:3500/scrape", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
        //  Save the returned array in state and render the images by toggling run state
        .then((response) => response.json())
        .then((response) => {
          response = JSON.parse(response);
          setAds(response);
          setRunning(true);
        });
    } catch (err) {
      throw err;
    }
  };

  //  Handles user voting
  const voteAds = async (e) => {
    // Create an object with both the ad id and user choice (yes/no)
    const vote = {
      id: e.target.id,
      ad: e.target.value,
      vote: e.target.className,
    };
    e.preventDefault();
    //  Save the vote object to state
    setVotes([...votes, vote]);
    //  Remove the ad from the ad statearray
    setAds(ads.filter((ad) => ad.id !== vote.id));
    let jsonVote = JSON.stringify(vote);
    await fetch("http://localhost:3500/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonVote,
    })
      .then((response) => response.json())
      // TODO: Convert to UI notification
      .then((response) => {
        console.log(response);
      });
    // If the ad state array is empty,,,
    if (ads.length === 1) {
      //  Reset state
      setAds([]);
      setVotes([]);
      //  Return a new set of ads to vote on
      setRunning(true);
      scrapeAds();
      setRunning(false);
    }
  };

  //  TODO: write function to handle "unsure/skip"
  //  Handles click events
  const handleClick = async (e) => {
    //  Accept user parameters
    e.preventDefault();
    switch (e.target.name) {
      case "voteAds":
        voteAds(e);
        break;
      case "scrapeAds":
        scrapeAds();
        break;
      default:
        console.log(e.target);
    }
  };

  return (
    <div className="main_wrapper">
      <ParamBox
        handleClick={handleClick}
        params={params}
        handleCategory={handleCategory}
        handleLocation={handleLocation}
      />

      {running ? (
        ads.map((ad, index) => (
          <div key={index} style={{ display: index === 0 ? "block" : "none" }}>
            <Ads
              id={ad.id}
              url={ad.url}
              title={ad.title}
              alt={ad.desc}
              src={ad.img}
              price={ad.price}
              desc={ad.desc}
              index={index}
              length={ads.length}
            />

            <div className="vote_wrapper">
              <button
                type="button"
                id={ad.id}
                value={JSON.stringify(ad)}
                className="yes"
                name="voteAds"
                onClick={handleClick}
              >
                Yes
              </button>
              <button
                type="button"
                id={ad.id}
                value={JSON.stringify(ad)}
                name="voteAds"
                className="no"
                onClick={handleClick}
              >
                No
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="ad" onClick={scrapeAds} style={{ cursor: "pointer" }}>
          <h1>Get twacking.</h1> <Footer />
        </div>
      )}
    </div>
  );
};

export default AdCard;
