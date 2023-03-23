import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LandingWrapper = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	font-family: "Fredoka One", cursive;
	color: white;
	padding-top: 10rem;
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
		font-family: "Fredoka One", cursive;
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

const Landing = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(auth.user);
		if (auth.user) {
			navigate("/home");
		}
	}, [auth, navigate]);

	return (
		<>
			<LandingWrapper>
				<h1>twack</h1>
				<p>witty slogan</p>
				<OptionWrapper>
					<Link to="/login">
						<button>Log In</button>
					</Link>

					<Link to="/register">
						{" "}
						<button> Register</button>
					</Link>
				</OptionWrapper>
				<Footer />
			</LandingWrapper>
		</>
	);
};

export default Landing;
