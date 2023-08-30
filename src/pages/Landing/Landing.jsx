import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../../components/LoginForm";
import Button from "../../components/Button";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Register from "../Register/Register";

const LandingWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	color: white;
	background: none;

	h1 {
		font-size: calc(6rem + 2vw);
		color: #588061;
		margin: 0;
		padding: 0;
	}
`;

const OptionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	border: #588061 2px solid;
	border-radius: 4px;
	background-color: #58806124;

	button {
		width: 8rem;
		text-align: center;
		background-color: #ffffff91;
		border: 2px solid #e7b5acae;
		color: rgba(0, 0, 0, 0.656);
		border-radius: 4px;
		font-family: "Fredoka", cursive;
		cursor: pointer;
		text-decoration: none;
		padding: 0.5rem 0rem;
		margin: 0.3rem 0rem;

		:hover {
			color: rgba(255, 255, 255, 0.874);
			outline: black;
			background: #5880619a;
			transition: transform 300ms, background 800ms;
		}
	}
`;

const BackButton = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	color: #588061;
	font-family: "Fredoka";
	font-size: 2rem;

	button {
		position: absolute;
		top: 0;
		left: 0;
		margin: 1rem;
	}
`;

const Landing = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	useEffect(() => {
		if (auth.user) {
			navigate("/home");
		}
	}, [auth, navigate]);

	return (
		<>
			<LandingWrapper>
				<h1>twack</h1>
				{showLogin ? (
					<>
						<BackButton>
							<Button
								label={"TEST"}
								icon={faBackward}
								size={"md"}
								handleClick={() => {
									setShowRegister(false);
									setShowLogin(false);
								}}
							></Button>
						</BackButton>
						<LoginForm />
					</>
				) : showRegister ? (
					<Register />
				) : (
					<OptionWrapper>
						<button onClick={() => setShowLogin(true)}>Log In</button>
						<button onClick={() => setShowRegister(true)}>Register</button>
					</OptionWrapper>
				)}
				<Footer />
			</LandingWrapper>
		</>
	);
};

export default Landing;
