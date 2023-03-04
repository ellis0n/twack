import { React, useEffect, useState } from "react";
import Banner from "../../components/Banner";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import axios from "../../api/axios";
import Footer from "../../components/Footer";
import styled from "styled-components";

const LOGIN_URL = "/auth";

const LoginWrapper = styled.div`
	display: flex;
`;

const Login = () => {
	const { setAuth } = useAuth();
	const auth = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [user, resetUser, userAttribute] = useInput("user", "");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [check, toggleCheck] = useToggle("persist", false);

	useEffect(() => {
		if (auth.user) {
			navigate("/ads");
		}
	}, [auth]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			const accessToken = response?.data?.accessToken;
			setAuth({ user, pwd, accessToken });
			// setUser('');
			resetUser();
			setPwd("");
			navigate(from, { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};

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
								id="username"
								autoComplete="off"
								{...userAttribute}
								className="text-input"
								required
							/>
						</label>

						<label htmlFor="password">
							<div className="input-value">Password:</div>
							<input
								type="password"
								value={pwd}
								onChange={(e) => setPwd(e.target.value)}
								className="text-input"
								required
							/>
						</label>

						<button className="login-btn" onClick={handleClick}>
							Sign In
						</button>

						<div className="persist-btn">
							<input
								type="checkbox"
								id="persist"
								onChange={toggleCheck}
								checked={check}
							/>
							<label htmlFor="persist">Stay logged in.</label>
						</div>
						<Link to="/register" style={{ textDecoration: "none" }}>
							{" "}
							<div className="landing-btn reg">
								<p> Register</p>
							</div>
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
