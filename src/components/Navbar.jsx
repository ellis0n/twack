import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ParamBox from "./ParamBox";
import Button from "./Button";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const StyledNav = styled.div`
	/* display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; */
	/* I want this to slide in from the right */
	flex-direction: column;
	align-items: start;
	text-align: left;
	font-weight: 600;
	z-index: 10000;
	/* width: 50vw; */
	height: calc(100vh - 60px);
	background: #588061;
	position: absolute;
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	transition: all 0.3s ease-in-out;
	left: 0;
	top: 60px;
`;

const LinkWrapper = styled.div`
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
			width: inherit;
			color: rgba(255, 255, 255, 0.774);
			outline: black;
			/* background: #588061; */
			transition: transform 900ms, background 400ms;
		}
	}
`;

const Navbar = ({ isOpen }) => {
	const logout = useLogout();
	const navigate = useNavigate();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	const links = [
		{ name: "Profile", link: "/profile" },
		{ name: "Lists", link: "/lists" },
		{ name: "Users", link: "/users" },
		{ name: "Settings", link: "/settings" },
		{ name: "About", link: "/about" },
	];

	return (
		// <NavBarWrapper isOpen={isOpen}>
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
			<Button
				label="Logout"
				handleClick={() => {
					signOut();
				}}
			/>
		</StyledNav>
		// </NavBarWrapper>
	);
};

export default Navbar;
