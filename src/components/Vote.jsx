import React, { useState } from "react";

const Vote = (props) => {
  const [state, setState] = useState({"vote": ""});

  const handleClick = async(e) => {
    handleState(e);
    console.log(state)
    try{
      let stateStr = JSON.stringify(state)
      await fetch("http://localhost:3500/user", {
        method: "POST",
        headers: { Accept: "application/json", 'Content-Type': 'application/json' },
        body: stateStr,
        })
        .then(response=>response.json())
        .then(response=>{
          response = JSON.parse(response)
        })
    }
      catch (err) {
        throw err
      }
  };

  const handleState = (e)=>{
    setState({"vote": e.target.value})
  }

  return (
    <div className="wrapper">
      <div className="vote">
        <button
          type = "button"
          value={props.value}
          className={props.value}
          onClick= {handleClick}>
          <div className = "vote_label">{props.value.toUpperCase()}</div>
        </button>
      </div>
    </div>
  );
};

export default Vote;
