import React  from "react";

const Vote = (props) => {

  const handleClick = async(e) => {
    const vote = { "id": e.target.id, "vote": e.target.value}
    try{
      let data = JSON.stringify(vote)
      await fetch("http://localhost:3500/user", {
        method: "POST",
        headers: { Accept: "application/json", 'Content-Type': 'application/json' },
        body: data,
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


  return (
    <div className="wrapper">
      <div className="vote">
      <div style={{display: props.index === 0  ? 'flex' : 'none' }}  >
        <button
        id = {props.id}
          type = "button"
          value={props.value}
          className={props.value}
          onClick= {handleClick}>
          <div className = "vote_label">{props.value.toUpperCase()}</div>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Vote;
