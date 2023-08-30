import { React, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import axios from "../api/axios";
import styled from "styled-components";
import { API_AUTH } from "../helper/endpoints";
import Button from "./Button";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	background: #f7e5e2e4;
	border-radius: 6px;
	width: 65vw;
	max-width: 500px;
	min-width: 300px;
	box-shadow: 0px 4px 6px 0px #588061;
	font-weight: 400;
	margin-top: 1rem;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;

		label {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			margin: 0.5rem;
			color: #588061;
		}
	}

	input {
		text-align: center;
		box-shadow: 0px 0px 2px 0px #588061;
		border-radius: 6%;
	}

	button {
		margin: 0.5rem;
		cursor: pointer;
		font-weight: 400;
		font-size: 1rem;
		color: #588061;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 0px 2px 0px #588061;
		border-radius: 6%;
		padding: 0.5rem;
		background: #f7e5e2e4;

		svg {
			margin: 0 0.5rem;
		}

		&:hover {
			opacity: 0.8;
			transition: all 0.2s ease-in-out;
		}
	}
`;

const InputLabel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #588061;
	font-weight: 500;

	p {
		margin: 0.5rem;
	}
`;

const PersistButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 0.5rem;
	color: #588061;

	input {
		margin: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	label {
		margin: 0.5rem;
		font-size: 1rem;
	}

	&:hover {
		background-color: #588061;
		color: #f7e5e2e4;
	}

	span {
		margin: 0.5rem;
		color: #588061;
	}
`;

const RegisterButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #588061;
	font-size: 1rem;
	margin: 0.5rem;
	padding: 0.25rem;
	border-radius: 4px;
	box-shadow: 0px 0px 2px 0px #588061;

	&:hover {
		background-color: #588061;
		color: #f7e5e2e4;
		transition: all 0.2s ease-in-out;
	}

	p {
		color: #588061;
		padding: 0.5rem;
		margin: 0;

		&:hover {
			cursor: pointer;
			color: #f7e5e2e4;
			font-weight: 400;
		}
	}
`;

const ErrorBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	margin: 0.5rem;
	padding: 0.25rem;
	border-radius: 4px;
	box-shadow: 0px 0px 2px 0px #588061;
	color: #588061;
`;

const Placeholder = styled.div`
	height: 1rem;
	width: 100%;
	margin: 0.5rem;
`;

const LoginForm = () => {
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
			navigate("/home");
		}
	}, [auth]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const handleClick = async () => {
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
			console.log(response);
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
				setErrMsg("Username or password incorrect.");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};

	return (
		<FormWrapper>
			<label htmlFor="username">
				<InputLabel>
					<p>Username:</p>
				</InputLabel>
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
				<InputLabel>
					<p>Password:</p>
				</InputLabel>
				<input
					type="password"
					value={pwd}
					onChange={(e) => setPwd(e.target.value)}
					className="text-input"
					required
				/>
			</label>

			<PersistButton>
				<input
					type="checkbox"
					id="persist"
					onChange={toggleCheck}
					checked={check}
				/>
				<label htmlFor="persist">Stay logged in?</label>
			</PersistButton>

			{errMsg ? <ErrorBox>{errMsg}</ErrorBox> : <Placeholder />}

			<Button
				handleClick={handleClick}
				icon={faRightToBracket}
				size={"2x"}
				label="Login"
			/>
			<Link to="/register" style={{ textDecoration: "none" }}>
				{" "}
				<RegisterButton>
					<p>Sign up here.</p>
				</RegisterButton>
			</Link>
		</FormWrapper>
	);
};

export default LoginForm;
