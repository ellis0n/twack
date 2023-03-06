import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ParamBox from "./ParamBox";
import Footer from "./Footer";

const StyledNav = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	text-align: left;
	font-weight: 600;
	z-index: 1;
	width: 100vw;
	height: 100vh;
	background: #588061f0;
	position: fixed;
	left: 0;
	top: 60px;
	transform: translateX(-100%);
	transition: transform 0.5s ease-in-out;

	${(props) =>
		props.isOpen &&
		`
    transform: translateX(0);
  `}
`;

const LinkWrapper = styled.div`
	width: 100vw;
	padding: 1rem 1rem;
	margin: 0.4rem 1rem;
	border-radius: 5px;
	transition: transform 900ms, background 1550ms;

	&:hover {
		transform: scale(1.02);
		color: rgba(255, 255, 255, 0.774);
		outline: black;
		transition: transform 900ms, background 1550ms;
		background: #588061;
	}

	a {
		text-decoration: none;
		color: #000000d5;
		font-family: "Fredoka One", cursive;
		font-size: 2rem;

		&:hover {
			color: rgba(255, 255, 255, 0.774);
			outline: black;
			background: #588061;
			transition: transform 900ms, background 400ms;
		}
	}
`;

const Navbar = ({ isOpen }) => {
	const links = [
		{ name: "Home", link: "/home" },
		{ name: "Ads", link: "/ads" },
		{ name: "Saved", link: "/saved" },
		{ name: "Users", link: "/users" },
		{ name: "Settings", link: "/settings" },
	];

	return (
		<StyledNav isOpen={isOpen}>
			{links.map((link, index) =>
				link.name === "Ads" ? (
					<LinkWrapper key={index}>
						<Link to={link.link}>{link.name}</Link>
						<ParamBox />
					</LinkWrapper>
				) : (
					<LinkWrapper key={index}>
						<Link to={link.link}>{link.name}</Link>
					</LinkWrapper>
				)
			)}
		</StyledNav>
	);
};

export default Navbar;
