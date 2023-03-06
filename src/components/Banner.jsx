import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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

	.burger {
		display: ${(props) => (props.theme === "header" ? "inline-block" : "none")};
		color: #588061;
		font-size: 24px;
		vertical-align: middle;
		cursor: pointer;
		margin-right: 10px;
	}

	h1 {
		font-size: ${(props) =>
			props.theme === "landing" ? "8rem" : "calc(1.8rem + 1vw)"};
		margin: 0;
		animation: ${(props) =>
			props.theme === "landing" ? "slideIn 0.8s ease-out forwards" : ""};
	}

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
`;

const Banner = ({ theme }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	console.log(theme);
	console.log(isMenuOpen);

	return (
		<>
			<StyledBanner theme={theme}>
				<FontAwesomeIcon
					icon={faBars}
					className="burger"
					onClick={(e) => {
						e.preventDefault();
						setIsMenuOpen(!isMenuOpen);
					}}
				/>
				<Link to={theme === "landing" ? "/" : "/ads"} className="logo-link">
					<h1>twack</h1>
				</Link>
			</StyledBanner>

			{isMenuOpen ? <Navbar isOpen={isMenuOpen} /> : null}
		</>
	);
};

export default Banner;
