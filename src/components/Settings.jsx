import React, { useState, useEffect } from 'react';
import ParamBox from './ParamBox'

const Settings = () => {
  const [params, setParams] = useState({ location: 0, category: 0 });


  const handleLocation = (e) => {
    setParams({ location: e.target.value, category: params.category });
  };
  const handleCategory = (e) => {
    setParams({ location: params.location, category: e.target.value });
  };
  const handleClick = async(e)=>{
    e.prevent.default()
    console.log(e)
    // const data = JSON.stringify(e.value);
    // await fetch("http://localhost:3500/param", {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: data,
    // })
    // .then((response) =>(response.json()))
  }


  return (
    <div className='main_wrapper'>
      <ParamBox
      text= "Save preferences."
        // handleClick={handleClick}
        params={params}
        handleCategory={handleCategory}
        handleLocation={handleLocation}
        handleClick = {handleClick}
      />    
    </div>
  )
}

export default Settings