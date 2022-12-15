import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  return (
    <div>
      <Link to="/ads">
        <h1>Ads</h1>
      </Link>
    </div>
  );
};

export default Landing;
