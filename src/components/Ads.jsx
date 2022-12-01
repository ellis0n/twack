import React from "react";

//  The component for rendering each individual ad
const Ads = ({ url, title, alt, src, price, desc, index }) => {
  return (
    <div className="ad" key={index}>
      <a href={url}>
        <h1>{title}</h1>
      </a>
      <div className="img-wrapper">
        <img alt={alt} src={src}></img>
      </div>
      <h2>${price}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default Ads;
