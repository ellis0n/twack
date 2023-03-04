import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const StyledBanner = styled.div`
	font-weight: 900;
	color: #588061;
	font-family: "Fredoka One", cursive;
	justify-content: space-evenly;
	align-items: center;
	margin: 0px 20px;

	display: ${(props) => (props.theme === "landing" ? "block" : "flex")};
	font-size: ${(props) => (props.theme === "landing" ? "3rem" : "2rem")};
	padding: ${(props) => (props.theme === "landing" ? "1rem" : "0.5rem")};

	h1 {
	}
`;

const Banner = ({ theme }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	console.log(theme);
	console.log(isMenuOpen);

	return (
		<>
			<StyledBanner theme={theme}>
				<Link to="/ads" className="logo-link">
					<h1>twack</h1>
				</Link>
				{theme === "header" ? (
					<FontAwesomeIcon
						icon={faBars}
						color="white"
						size="lg"
						className="burger"
						cursor={"pointer"}
						onClick={(e) => {
							e.preventDefault();
							setIsMenuOpen(!isMenuOpen);
						}}
					/>
				) : null}
			</StyledBanner>

			{isMenuOpen ? <Navbar isMenuOpen={isMenuOpen} /> : null}
		</>
	);
};

export default Banner;
