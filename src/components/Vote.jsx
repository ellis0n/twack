import React from 'react'

const Vote = (props) => {
  return (
    <div className = "vote_wrapper"><button value={props.value} className={props.value}>Vote</button></div>
  )
}

export default Vote