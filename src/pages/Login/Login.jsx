import { React, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import axios from "../../api/axios";
import Footer from "../../components/Footer";
import styled from "styled-components";

import LoginForm from "../../components/LoginForm";
import { API_AUTH } from "../../helper/endpoints";

const LOGIN_URL = "/auth";

const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: calc(6rem + 2vw);
		color: #588061;
		margin: 0;
		padding: 0;
		font-weight: 800;
	}

	input {
		font-family: "Fredoka", cursive;
	}
`;

const LoginButton = styled.button`
	width: 8rem;
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
			navigate("/");
		}
	}, [auth]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				API_AUTH,
				JSON.stringify({ user, pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			const accessToken = response?.data?.accessToken;
			setAuth({ user, accessToken });
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
		<LoginWrapper>
			<h1>twack</h1>
			<div className="login">
				{errMsg ? (
					<div className="error-msg">
						<h4>{`${errMsg}`}</h4>
					</div>
				) : null}

				<LoginForm />
			</div>
			<Footer />
		</LoginWrapper>
	);
};

export default Login;
