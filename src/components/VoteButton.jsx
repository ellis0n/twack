import React from "react";

//TODO: Take in only ad.id and sort back in parent component
const VoteButton = ({ ad, vote, text, handleClick }) => {
  let data = { ad: ad, vote: vote };
  let className = vote.toString(); //TODO: This is dumb

  const onClick = async (e) => {
    e.preventDefault();
    handleClick(data);
  };

  return (
    <button id={ad} type="button" className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default VoteButton;
