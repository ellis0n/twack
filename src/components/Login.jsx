import { React, useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthProvider';
import Banner from './Banner'


const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");    
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErr("");
    }, [user, pwd])

    
    const handleClick = async(e) => {
        e.preventDefault();
        const data = JSON.stringify({ user, pwd });
        await fetch("http://localhost:3500/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                withCredentials: true
            },
            body: data
        })
          .then((response) => {
            if (response.status === 401){
              throw new Error("Invalid username or password")
            } else if (
                response.status === 400){
                throw new Error("Missing username or password")
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
    <Banner className ="banner"/>
    {success ? (
        <>
            <div className = "true">
                <h1>Welcome back.</h1>
            </div>
            <div className = "logo">
                <p>
                    <a href="/ads">Get twacking.</a>
                </p>
            </div>
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
                <label htmlFor="username">
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

                <button className = "login-btn" onClick={handleClick}>
                    Sign In
                </button>
            </form>
        </div>
        <h4 className = "auth-link">
            <a href="/login">New here?</a>
        </h4>
    </div>
    )}
    </>
    )
}

export default Login