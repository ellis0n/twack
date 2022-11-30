import React from 'react'

const VoteButton = (props) => {
  let data = {ad: props.ad, vote: props.vote}
  let className = props.vote.toString()

    const handleClick = async (e) => {
        e.preventDefault();      
        props.handleClick(data);  
    }

  return (
    <button
        id= {props._id}
        type="button"
        data= {props.ad}
        className={className}
        onClick={handleClick}>
        {props.text}
    </button>
  )
}

export default VoteButton