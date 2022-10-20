import React from "react";
import { useState } from "react";
import Vote from "../components/Vote";

const NewAd = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClick = async (e) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3500/ads", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      console.log("Fetch attempt made");
      const result = await response.json();

      setItems(result);
      console.log(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      {err && <h2>{err}</h2>}
      <button method="get" onClick={handleClick}>
        Fetch data
      </button>
      {isLoading && <h2>Loading...</h2>}
      {items.map((item) => {
        return (
          <div className="ad" key={item.id}>
            <a href={item.url}>
              <h1>{item.title}</h1>
            </a>
            <div className="img-wrapper">
              <img alt={item.desc} src={item.img}></img>
            </div>
            <h2>${item.price}</h2>
            <Vote value="deal" text="YES" />
            <Vote value="nodeal" text="NO" />
          </div>
        );
      })}
    </div>
  );
};

export default NewAd;
