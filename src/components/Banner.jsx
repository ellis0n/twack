import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

const BlurDiv = styled.div`
	position: ${(props) => (props.theme === "landing" ? "relative" : "absolute")};
	top: 0;
	left: 0;
	width: ${(props) => (props.theme === "landing" ? "auto" : "100%")};
	height: ${(props) =>
		props.theme === "landing" ? "auto" : props.isOpen ? "100%" : "60px"};
	background-color: ${(props) => (props.isOpen ? "#00000092" : "none")};
	z-index: ${(props) => (props.isOpen ? "1" : "0")};
	backdrop-filter: ${(props) => (props.isOpen ? "blur(.7px)" : "none")};
`;

const StyledBanner = styled.div`
	color: #588061;
	font-family: "Fredoka One", cursive;
	align-items: center;

	width: 100vw;
	height: 60px;

	background-color: ${(props) =>
		props.theme === "landing" ? "none" : "#F7E5E2"};
	display: ${(props) => (props.theme === "landing" ? "block" : "flex")};
	font-size: ${(props) => (props.theme === "landing" ? "3rem" : "1rem")};
	padding-bottom: ${(props) => (props.theme === "landing" ? "120px" : "0px")};

	svg {
		display: ${(props) => (props.theme === "header" ? "inline-block" : "none")};
		background-color: #f7e5e2;
		cursor: pointer;
		margin: 0 12px;
		font-size: 1em;
		color: #588061;
		padding: 6px 6px;
		border-radius: 48%;
		border: 1.5px solid #588061;

		:hover {
			background-color: #588061dd;
			color: #f7e5e2;
			transition: all 0.2s ease-in-out;
		}
	}

	h1 {
		font-size: ${(props) =>
			props.theme === "landing" ? "8rem" : "calc(1.8rem + 1vw)"};
		margin: 0;
		animation: ${(props) =>
			props.theme === "landing" ? "slideIn 0.8s ease-out forwards" : ""};

		:hover {
			color: #588061;
		}

		@keyframes slideIn {
			from {
				opacity: 0;
				transform: translateY(20%);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@media (max-width: 768px) {
			font-size: ${(props) =>
				props.theme === "landing" ? "5rem" : "calc(1.8rem + 1vw)"};

			padding-top: ${(props) => (props.theme === "landing" ? "20px" : "0px")};
		}
	}

	button {
		display: ${(props) =>
			props.theme === "landing" ? "none" : "inline-block"};
		position: absolute;
		right: 12px;
		border: 2px solid #588061;

		background-color: #f7e5e2;
		color: #588061;
		padding: 10px 20px;
		border-radius: 24px;

		:hover {
			background-color: #588061c3;
			color: #f7e5e2;
			transition: 0.3s;
		}
	}
`;

const Banner = ({ theme }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<BlurDiv theme={theme} isOpen={isMenuOpen}>
			<StyledBanner theme={theme} isOpen={isMenuOpen}>
				<FontAwesomeIcon
					icon={faBars}
					onClick={(e) => {
						e.preventDefault();
						setIsMenuOpen(!isMenuOpen);
					}}
				/>
				<Link to={theme === "landing" ? "/" : "/home"} className="logo-link">
					<h1>twack</h1>
				</Link>
				<Button
					label="Logout"
					handleClick={() => {
						signOut();
					}}
				/>
			</StyledBanner>

			{isMenuOpen ? <Navbar className="navbar" isOpen={isMenuOpen} /> : null}
		</BlurDiv>
	);
};

export default Banner;
