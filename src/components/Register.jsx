import React, {useState, useEffect} from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import { Link } from "react-router-dom";


//todo: add error message for username and password
//todo: validate username and password

const Register = () => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);



  const handleClick = async(e) => {
    e.preventDefault();
    const data = JSON.stringify({ user, pwd });
    await fetch("http://localhost:3500/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true
      },
      body: data
    })
      .then((response) => {
        if (response.status === 409){
          throw new Error("Username already exists")
        }
        console.log(response)
        setSuccess(true);
        setUser('');
        setPwd('');
        })
      .catch((err) => {
        setErr(err)
        })
      }


  return (
    <>
    <Banner className="banner"/>
    {success ? (
                <>
                <div className = "true">
                    <h1>Account created.</h1>
                </div>
                <Link to="/login" style={{ textDecoration: 'none' }}> <div className="landing-btn reg"><p> Login</p></div>
    </Link>
                </>
            ) : (

    <div className="login">
      {err ?
       <div className = "error-msg">
          <h4>{`${err}`}</h4>
      </div> :
      null
      }
      <div className = "login-form">
        <form> 

          <label>
            <div className = "input-value">
              Username:
            </div>
            <input 
            type="text"
            value={user} 
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}  className = "text-input"/>
          </label>

          <label >
            <div className = "input-value">Password:</div>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} className = "text-input"/>
          </label>

          <button className = "login-btn" onClick={handleClick}>Sign Up</button>
        </form>
      </div>

    </div>

            )}

    <Footer/>
    </>
  );
};

export default Register;