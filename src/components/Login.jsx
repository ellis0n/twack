import React, {useState} from "react";
import Banner from "./Banner";
import Footer from "./Footer";

// Placeholder login div  


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);



  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const data = JSON.stringify({ user: username, pwd: password });
    await fetch("http://localhost:3500/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data
    }).then((response) => response.json().then((response) => console.log(response)),
    setUser(true)
    )};

    //this function 

  return (
    <>
    <Banner className="banner"/>
    <div className="login">
    <div className = "login-form">
      <form onSubmit={handleSubmit}>        
        <label >
          <div className = "input-value">Username:</div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  className = "text-input"/>
        </label>
        <label >
          <div className = "input-value">Password:</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className = "text-input"/>
        </label>
        <br/>
        <input type="submit" value="Login" className = "login-btn"/>
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
