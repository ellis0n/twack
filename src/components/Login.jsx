import { React, useEffect, useState } from "react";
import Banner from "./Banner";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleClick = async (e) => {
    e.preventDefault();

      try {
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({ user, pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          const accessToken = response?.data?.accessToken;
          setAuth({ user, pwd, accessToken });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
      }
    }

    
  return (
    <>
      <Banner className="banner" />
      <div className="login">
        {errMsg ? (
          <div className="error-msg">
            <h4>{`${errMsg}`}</h4>
          </div>
        ) : null}
        <div className="login-form">
          <form>
            <label htmlFor="username">
              <div className="input-value">Username:</div>
              <input
                type="text"
                value={user}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                className="text-input"
              />
            </label>

            <label>
              <div className="input-value">Password:</div>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="text-input"
              />
            </label>

            <button className="login-btn" onClick={handleClick}>
              Sign In
            </button>
          </form>
        </div>
        <h4 className="auth-link">
          <Link to="/register">New here?</Link>
        </h4>
      </div>
    </>
  );
};

export default Login;
