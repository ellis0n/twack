import React from "react";
import { useState, useEffect } from "react";
import Ads from "./Ads";
import Footer from "./Footer.jsx";
import ParamBox from "./ParamBox";
import VoteButton from "./VoteButton";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { AuthProvider } from "../context/AuthProvider";
import useAuth from '../hooks/useAuth';

//  Card for holding each individual ad and its child voting options
//  TODO:: Add a comment box component
const AdCard = () => {
  const { auth } = useAuth();
  const [ads, setAds] = useState([]);
  const [votes, setVotes] = useState([]);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    const updateParams = async () => {
      await fetch("http://localhost:3500/pref", {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer: ${ auth.accessToken }`
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
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer: ${ auth.accessToken }`
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

  //TODO: Pass back only vote id and filter against ads in state.
  const sendVote = async (vote) => {
    setVotes([...votes, vote]);
    // Remove ad from state once voted on
    setAds(ads.filter((ad) => ad.id !== vote.ad.id));
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
        // console.log(response);
      });
    // If the ad state array is empty, reset vote counter
    if (ads.length === 1) {
      //TODO: conditional render for continue
      setVotes([]);
      setRunning(false);
    }
  };

  return (
    <>
    <Banner className= "banner-sm"/>
    <Navbar/>
    <div className="main_wrapper">
      <ParamBox type="scraper" text={"Get Ads."} handleClick={scrapeAds} />

      {running ? (
        // IF ADS ARRAY STATE EMPTY
        ads.length === 0 ? (
          <div className="ad">
            <h2>No more ads!</h2>
            <h3> Try again later.</h3>
            <Footer />
          </div>
        ) : (
          // IF ADS ARRAY STATE NOT EMPTY
          ads.map((ad, index) => (
            <div
              key={index}
              style={{ display: index === 0 ? "block" : "none" }}
            >
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
                  ad={ad}
                  vote={true}
                  text="Deal"
                  handleClick={sendVote}
                />
                <VoteButton
                  ad={ad}
                  vote={false}
                  text="No Deal"
                  handleClick={sendVote}
                />
              </div>
            </div>
          ))
        )
      ) : (
        // IF NOT RUNNING
        <div style={{ cursor: "pointer" }}>
          <h2>Loading...</h2>
          <Footer />
        </div>
      )}
    </div>
    </>
  );
};

export default AdCard;
