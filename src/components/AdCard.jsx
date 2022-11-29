import React from "react";
import { useState, useEffect } from "react";
import Ads from "./Ads";
import Footer from "./Footer.jsx";
import ParamBox from "./ParamBox";
import VoteButton from "./VoteButton";

//  Card for holding each individual ad and its child voting options
//  TODO:: Add a comment box component
const AdCard = () => {
  const [ads, setAds] = useState([]);
  const [votes, setVotes] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const updateParams = async () => {
      await fetch("http://localhost:3500/pref", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) =>
          scrapeAds({
            location: response[0].location,
            category: response[0].category,
          })
        );
    };
    updateParams();
  }, []);

  //  Request handler for scraping ads
  const scrapeAds = async (params) => {
    try {
      const data = JSON.stringify(params);
      await fetch("http://localhost:3500/scrape", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
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

  //  Handles user voting.
  const sendVote = async (data) => {
    const vote = {
      id: data.ad.id,
      ad: data.ad,
      vote: data.vote,
    };

    setVotes([...votes, vote]);
    // Remove ad from state once voted on
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
      .then((response) => {
        // TODO: Convert to UI notification
        console.log(response);
      });
    // If the ad state array is empty, reset vote counter
    if (ads.length === 1) {
      //TODO: conditional render for continue
      setVotes([]);
      setRunning(false);
    }
  };

  return (
    <div className="main_wrapper">
      <ParamBox type="scraper" text={"Get Ads."} handleClick={scrapeAds} />

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
            />

            <div className="vote_wrapper">
              <VoteButton
                adInfo={ad}
                vote="true"
                text="Deal!"
                sendVote={sendVote}
              />
              <VoteButton
                adInfo={ad}
                vote="false"
                text="No Deal!"
                sendVote={sendVote}
              />
            </div>
          </div>
        ))
      ) : (
        <div style={{ cursor: "pointer" }}>
          <h1>Get twacking.</h1>
        </div>
      )}
    </div>
  );
};

export default AdCard;
