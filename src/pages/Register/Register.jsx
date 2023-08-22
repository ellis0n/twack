import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axios";

//todo: add error message for username and password
//todo: validate username and password
//todo: turn this into a real component

const RegisterWrapper = styled.div`
	margin-top: 120px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Register = () => {
	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const [err, setErr] = useState("");
	const [success, setSuccess] = useState(false);

	const handleClick = async (e) => {
		e.preventDefault();

		const response = await axios.post(
			"/register",
			{ user, pwd },
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);

		if (response.data.status === "201") {
			setSuccess(true);
		} else {
			setErr(response.data.message);
		}
	};

	return (
		<>
			<RegisterWrapper>
				{success ? (
					<div className="login">
						<h1>Account created.</h1>
						<Link to="/login" style={{ textDecoration: "none" }}>
							{" "}
							<div className="landing-btn reg">
								<p> Login</p>
							</div>
						</Link>
					</div>
				) : (
					<div className="login">
						{err ? (
							<div className="error-msg">
								<h4>{`${err}`}</h4>
							</div>
						) : null}
						<div className="login-form">
							<form>
								<label>
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
									Sign Up
								</button>
							</form>
						</div>
						{err ? (
							<div className="error-msg">
								<h4>{`${err}`}</h4>
							</div>
						) : null}
					</div>
				)}
			</RegisterWrapper>

			<Footer />
		</>
	);
};

export default Register;
