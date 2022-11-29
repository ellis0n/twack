import React from 'react'

const VoteButton = ({adInfo, vote, sendVote, text}) => {
    let data = {id: adInfo.id, ad: adInfo, vote: vote}
    const handleClick = async (e) => {
        e.preventDefault();      
        sendVote(data);  
    }

  return (
    <button
        type="button"
        id={adInfo.id}
        className={vote}
        onClick={handleClick}>
        {text}
    </button>
  )
}

export default VoteButton