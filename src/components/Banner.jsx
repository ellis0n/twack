import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Banner = ({className}) => {

  return (
  <div className={className}>
    { className === "banner-sm" ?   <div className = "burger"> <FontAwesomeIcon 
      icon={faBars}  
      color="white" 
      size="xs" 
      className = "burger"
      /></div> : null }
    <div className="logo">
      twack
    </div>
  </div>);

};

export default Banner;
