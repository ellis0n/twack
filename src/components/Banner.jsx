import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";



const Banner = ({className}) => {
// This function links the user to the home page

  return (
    <>
  <div className={className}>
    { className === "banner-sm" ?   <div className = "burger"> <FontAwesomeIcon 
      icon={faBars}  
      color="white" 
      size="xs" 
      className = "burger"
      /></div> : null }
    <div className="logo" >
      <Link to= "/" className = "logo-link"><div className="logo" >twack</div></Link>
    </div>
  </div>
  </>
  
  );

};

export default Banner;
