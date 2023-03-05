import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const StyledBanner = styled.div`
	color: #588061;
	background-color: #ffffffa6;
	font-family: "Fredoka One", cursive;
	/* justify-content: space-evenly; */
	align-items: center;
	height: 10vh;
	min-height: 50px;
	width: 100vw;
	display: ${(props) => (props.theme === "landing" ? "block" : "flex")};
	font-size: ${(props) => (props.theme === "landing" ? "3rem" : "1rem")};
	padding: ${(props) => (props.theme === "landing" ? "1rem" : "0px")};

	.burger {
		display: ${(props) => (props.theme === "header" ? "inline-block" : "none")};
		color: #588061;
		font-size: 24px;
		vertical-align: middle;
		cursor: pointer;
		margin-right: 10px;
	}

	h1 {
		font-size: calc(1.8rem + 1vw);
		padding: 0.5rem;
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
				<Link to="/ads" className="logo-link">
					<h1>twack</h1>
				</Link>
			</StyledBanner>

			{isMenuOpen ? <Navbar isMenuOpen={isMenuOpen} /> : null}
		</>
	);
};

export default Banner;
