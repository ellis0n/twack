import React, { useState } from 'react';
import ParamBox from './ParamBox'

const Settings = () => {
  const [params, setParams] = useState({ location: 0, category: 0 });

  const handleLocation = (e) => {
    setParams({ location: e.target.value, category: params.category });
  };
  const handleCategory = (e) => {
    setParams({ location: params.location, category: e.target.value });
  };
  const handleUpdate = async(e)=>{
    const data = JSON.stringify(params);
    await fetch("http://localhost:3500/param", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
    .then((response) => console.log(response.json()))
  }


  return (
    <div className='main_wrapper'>
      <ParamBox
      text= "Save preferences."
        // handleClick={handleClick}
        route = "/param"
        method = "put"
        params={params}
        handleCategory={handleCategory}
        handleLocation={handleLocation}
        handleClick = {handleUpdate}
      />    
    </div>
  )
}

export default Settings