import { React, useEffect, useState } from "react";
import Banner from "./Banner";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
  }, [user, pwd]);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({ user, pwd });
    await fetch("http://localhost:3500/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.status === 401) {
          throw new Error("Invalid username or password");
        } else if (response.status === 400) {
          throw new Error("Missing username or password");
        }
        const accessToken = response.accessToken;
        const roles = response.roles;
        console.log(accessToken, roles);
        setAuth({ user, pwd, roles, accessToken });
        setUser("");
        setPwd("");
        navigate(from, { replace: true });

      })
      .catch((err) => {
        setErr(err);
      });
  };

  return (
    <>
      <Banner className="banner" />
      <div className="login">
        {err ? (
          <div className="error-msg">
            <h4>{`${err}`}</h4>
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
