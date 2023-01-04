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
    console.log(ads);
  };

  const updateVote = async ({ ad, vote }) => {
    console.log(ad);
    let newVote;
    vote === true ? (newVote = false) : (newVote = true);
    try {
      const response = await axiosPrivate.put(
        "/vote",
        JSON.stringify({ ad: ad.id, vote: newVote, user: auth.user }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      getSavedAds();
      setRunning(true);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: stateLocation }, replace: true });
    }
  };

  const deleteVote = async ({ ad }) => {
    console.log(ad.id);
    try {
      const response = await axiosPrivate.delete(
        "/vote",
        { data: ad.id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
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
                  url={ad.url}
                  title={ad.title}
                  alt={ad.desc}
                  src={ad.img}
                  price={ad.price}
                  desc={ad.desc}
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
                  {/* <VoteButton
                    ad={ad}
                    vote={!ad.vote}
                    text="Delete"
                    handleClick={deleteVote}
                  /> */}
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
