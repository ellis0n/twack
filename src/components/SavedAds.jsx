import React, { useState, useEffect } from "react";
import Ads from "./Ads";
import Footer from "./Footer";
import VoteButton from "./VoteButton";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const SavedAds = () => {
  const [ads, setAds] = useState([]);
  const [running, setRunning] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const stateLocation = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();
    getSavedAds();

    // return () => {
    // isMounted = false;
    // controller.abort();
    // }
  }, []);

  const getSavedAds = async () => {
    console.log("Getting saved ads.");
    try {
      const response = await axiosPrivate.get("/vote", {
        // signal: controller.signal
      });
      // isMounted  &&
      console.log(response.data);
      setAds(response.data);
      setRunning(true);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: stateLocation }, replace: true });
    }
  };

  const updateVote = async ({ ad, vote }) => {
    let newVote;
    vote === true ? (newVote = false) : (newVote = true);
    try {
      const response = await axiosPrivate.put(
        "/vote",
        JSON.stringify({ ad: ad.ad, vote: newVote }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(`Ad ${response.data.ad.id} updated to ${response.data.vote}`);
      getSavedAds();
      setRunning(true);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: stateLocation }, replace: true });
    }
  };

  const deleteVote = async ({ ad }) => {
    console.log(ad);
    try {
      const response = await axiosPrivate.delete(
        "/vote",
        { data: ad },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(`Ad deleted.`);
      getSavedAds();
      // setRunning(true);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: stateLocation }, replace: true });
    }
  };

  return (
    <>
      <Banner className="banner-sm" />
      <Navbar />
      <div className="main_wrapper">
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
