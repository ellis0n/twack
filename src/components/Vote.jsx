import React, { useState } from "react";

const Vote = (props) => {
  const [userVote, setUserVote] = useState(null);

  const handleVote = (e) => {
    let vote = "";
    vote = e.target.value;
    if (vote === "deal") {
      console.log("DEAL");
      setUserVote("yes");
    } else if (vote === "nodeal") {
      console.log("NODEAL");
      setUserVote("no");
    }
    return userVote;
  };

  return (
    <div className="wrapper">
      <div className="vote">
        <button
          value={props.value}
          className={props.value}
          onClick={handleVote}
        >
          {props.text.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default Vote;
