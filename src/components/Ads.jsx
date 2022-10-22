import React from 'react'
import Vote from './Vote'

const Ads = (props) => {
    console.log(props) 
  return (
        <div className="ad" key={props.id}>
            <a href={props.url}>
                <h1>{props.title}</h1>
            </a>
            <div className="img-wrapper">
                <img alt={props.alt} src={props.src}></img>
            </div>
            <h2>${props.price}</h2>
            <Vote value="deal" text="YES" />
            <Vote value="nodeal" text="NO" />
        </div>
    )}

export default Ads