import React from "react";
import { useState, useEffect } from "react";
import Vote from "./Vote";

const Ad = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3500/ads")
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    // HTML response
    return (
      // console.log({ items }),
      <div className="wrapper">
        {items.map((item) => (
          <div className="ad" key={item.id}>
            <a href={item.url}>
              <h1>{item.title}</h1>
            </a>
            <div className="img-wrapper"><img alt={item.desc} src={item.img}></img></div>
            <h2>${item.price}</h2>
          </div>
        ))}
      </div>
    );
  }
};
export default Ad;
