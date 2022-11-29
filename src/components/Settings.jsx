import React from 'react';
import ParamBox from './ParamBox'

const Settings = () => {
  
  //  TODO: Save to local storage
  const handleClick = async(params)=>{
    const data = JSON.stringify(params);
    await fetch("http://localhost:3500/param", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
    .then((response) =>(response.json()))
  }

  return (
    <div className='main_wrapper'>
      <ParamBox
      type= "setting"
      text= "Save preferences."
      handleClick={handleClick}
      />    
    </div>
  )
}

export default Settings