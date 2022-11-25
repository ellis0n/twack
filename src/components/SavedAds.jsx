import React, { useState } from "react";
import Ads from "./Ads";

const SavedAds = () => {
  const [ads, setAds] = useState([]);
  const [running, setRunning] = useState(false);

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
        setAds(response);
        setRunning(true);
      });
  };

  const updateVote = async () => {
    await fetch("http://localhost:3500/save", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const deleteVote = async (e) => {
    console.log(e.target.id);
    let jsonDelete = { id: e.target.id };
    jsonDelete = JSON.stringify(jsonDelete);

    await fetch(`http://localhost:3500/save`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonDelete,
    }).then((response) => response.json());
  };

  return (
    <div className="main_wrapper">
      <button onClick={getSavedAds} className="ad">
        Refresh saved ads.
      </button>
      {running ? (
        ads.length === 0 ? (
          <h3>No ads!</h3>
        ) : (
          ads.map((ad, index) => (
            <div key={index}>
              <Ads
                //    TODO: destructure
                id={ad.ad.id}
                url={ad.ad.url}
                title={ad.ad.title}
                alt={ad.ad.desc}
                src={ad.ad.img}
                price={ad.ad.price}
                desc={ad.ad.desc}
                index={index}
                length={ads.length}
              />
              <div className={ad.vote}>{ad.vote}</div>
              <div>
                <button id={ad._id} onClick={deleteVote}>
                  Delete
                </button>
              </div>
              <hr />
            </div>
          ))
        )
      ) : (
        <div className="ad" onClick={getSavedAds}>
          <h1>See saved ads.</h1>
        </div>
      )}
    </div>
  );
};

export default SavedAds;
