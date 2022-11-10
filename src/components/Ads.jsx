import React from 'react'
import Vote from './Vote'

const Ads = ({id, url, title, alt, src, price, desc, index, length}) => {
    
  return (
        <div className="ad" key={id} hidden = {false}>
            <a href={url}>
                <h1>{title}</h1>
            </a>
            <div className="img-wrapper">
                <img alt={alt} src={src}></img>
            </div>
            <h2>${price}</h2>
            <p>{desc}</p>
            <div className="vote_wrapper">
                <Vote value="yes" id={id}/>
                <Vote value="no"  />
            </div>
        </div>
    )}

export default Ads