import React from 'react'

const VoteButton = (props) => {


  let data = {ad: props.ad, vote: props.vote}

    const handleClick = async (e) => {
        e.preventDefault();      
        props.handleClick(data);  
    }

  return (
    <button
        type="button"
        data= {props.ad}
        className={props.vote}
        onClick={handleClick}>
        {props.text}
    </button>
  )
}

export default VoteButton