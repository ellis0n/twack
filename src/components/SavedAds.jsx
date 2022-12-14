import React, { useState, useEffect } from "react";
import Ads from "./Ads";
import Footer from "./Footer";
import VoteButton from "./VoteButton";
import Banner from "./Banner";
import Navbar from "./Navbar";
const SavedAds = () => {
  const [ads, setAds] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    getSavedAds();
  }, []);

  const getSavedAds = async () => {
    await fetch("http://localhost:3500/save", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setAds(response);
        setRunning(true);
      });
  };

  const updateVote = async ({ ad, vote }) => {
    let newVote;
    vote === true ? (newVote = false) : (newVote = true);
    console.log(ad);
    const data = JSON.stringify({ ad: ad.ad, vote: newVote });
    await fetch("http://localhost:3500/save", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    }).then((response) => response.json());
    getSavedAds();
  };

  const deleteVote = async (data) => {
    console.log(data.ad);
    let deletedAd = JSON.stringify(data.ad);

    await fetch(`http://localhost:3500/save`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: deletedAd,
    }).then((response) => response.json());
    getSavedAds();
  };

  return (
    <>
    <Banner className = "banner-sm"/>
    <Navbar/>
    <div className="main_wrapper">
      {/* <button onClick={getSavedAds} className="ad">
        Refresh saved ads.
      </button> */}

      {running ? (
        ads.length === 0 ? (
          <h3>No ads!</h3>
        ) : (
          ads.map((ad, index) => (
            <div key={index}>

              <Ads
                url={ad.ad.url}
                title={ad.ad.title}
                alt={ad.ad.desc}
                src={ad.ad.img}
                price={ad.ad.price}
                desc={ad.ad.desc}
                index={index}
                length={ads.length}
              />

              <div className={ad.vote.toString()}>
                <h1>{ad.vote === true ? "Deal" : "No Deal"}</h1>
              </div>

              <div className="vote_wrapper">
                <VoteButton
                  ad={ad}
                  vote={ad.vote}
                  text="Change Vote"
                  handleClick={updateVote}
                />
                <VoteButton
                  ad={ad}
                  vote={!ad.vote}
                  text="Delete"
                  handleClick={deleteVote}
                />
              </div>
              <hr />
            </div>
          ))
        )
      ) : (
        <Footer />
      )}
    </div>
    </>
  );
};

export default SavedAds;
