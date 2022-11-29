import React, {useState, useEffect} from "react";
import skyline from "../img/background.png";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0)
  
  // useEffect(() => {   
  //   window.addEventListener("scroll", listenToScroll);
  //   return () => 
  //      window.removeEventListener("scroll", listenToScroll); 
  // }, [])
  
  // const listenToScroll = () => {
  //   let heightToHideFrom = 0;
  //   const winScroll = document.body.scrollTop || 
  //       document.documentElement.scrollTop;
  //   setHeight(winScroll);

  //   if (winScroll > heightToHideFrom) {  
  //        isVisible && setIsVisible(false);
  //   } else {
  //        setIsVisible(true);
  //   }  
  // };


  return (
  //   <div id="container">
  //  {
  //     isVisible 
  //      && 
     <div id="hide" className = "footer">
      <img alt="skyline" src={skyline}></img>
     </div>
    // }
  // </div>
  )
};

export default Footer;
