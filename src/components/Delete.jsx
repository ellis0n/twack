import React, { useState } from "react";

const Delete = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClick = async (e) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3500/ads", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      console.log("delete attempt made");
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
      <form method ="delete">
        <button onClick={handleClick}>
        Delete
        </button>
      </form>
      {isLoading && <h2>Loading...</h2>}
    </div>
  );
};

export default Delete;
