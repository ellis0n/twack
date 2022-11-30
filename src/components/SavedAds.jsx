import React, { useState, useEffect } from "react";
import Ads from "./Ads";
import Footer from "./Footer";
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
        setAds(response);
        setRunning(true);
      });
  };

  const updateVote = async (e) => {
    let id = e.target.id;
    let update;
    console.log(typeof(e.target.value))
    e.target.value === true ? (update = false) : (update = true);
    console.log(update)
    let jsonPut = { _id: id, vote: update };
    jsonPut = JSON.stringify(jsonPut);
    await fetch("http://localhost:3500/save", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonPut,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
    getSavedAds();
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
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
    getSavedAds();
  };

  return (
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

              <div className = "update_btn">
                <button 
                onClick={updateVote} 
                id={ad._id}
                value={ad.vote}>
                  Change vote
                </button>
              </div>

              <div className="delete_btn">
                <button onClick={deleteVote} id={ad._id}>
                  Delete
                </button>
              </div>
              <hr />
            </div>
          ))
        )
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default SavedAds;
