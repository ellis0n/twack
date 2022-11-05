import React from 'react'
import Vote from './Vote'

const Ads = ({id, url, title, alt, src, price}) => {
  return (
        <div className="ad" key={id}>
            <a href={url}>
                <h1>{title}</h1>
            </a>
            <div className="img-wrapper">
                <img alt={alt} src={src}></img>
            </div>
            <h2>${price}</h2>
            <Vote value="yes" text="yes" />
            <Vote value="no" text="no" />
        </div>
    )}

export default Ads