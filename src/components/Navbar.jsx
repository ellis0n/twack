import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faGear,
	faUsers,
	faQuestion,
	faList,
} from "@fortawesome/free-solid-svg-icons";

const StyledNav = styled.div`
	display: flex;
	position: fixed;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background: #588061;
	transition: all 0.1s ease-in-out;
	border-right: 3px solid #f7e5e2e1;
	z-index: 1;

	@media (max-width: 768px) {
		width: 100vw;
	}

	a {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		text-decoration: none;
		color: black;
		width: 100%;
	}
`;

const LinkWrapper = styled.div`
	display: flex;
	background-color: #f7e5e2a4;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 0.5rem 0rem;
	margin: 0.2rem 0;
	transition: transform 100ms, background 200ms;
	font-size: calc(1rem + 0.5vw);
	width: 100%;

	&:hover {
		transform: scale(1.0001);
		outline: black;
		transition: transform 100ms, background 200ms;
		background: #f7e5e23d;
		color: #f7e5e2;
	}

	svg {
		margin: 0rem 1rem;
		width: 1rem;
	}

	p {
		position: relative;
		left: 0.5rem;
		text-align: left;
		padding-left: 0.5rem;
	}
`;

// TODO: The footer does this, I just need to pass props for when used in the navbar
const NavBottom = styled.div`
	position: absolute;
	bottom: 0;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	opacity: 0.3;
	height: 60px;
	width: inherit;
	background-image: url(${process.env.PUBLIC_URL + "/background.png"});
`;

const Navbar = ({ isOpen, toggleClose }) => {
	const user = localStorage.user.replace(/"/g, "");
	// const logout = useLogout();
	// const navigate = useNavigate();

	const links = [
		{ name: "Home", link: "/home", icon: faHouse },
		// TODO: change to /mylists
		{ name: "My Lists", link: `/${user}/lists`, icon: faList },
		{ name: "Community", link: "/users", icon: faUsers },
		{ name: "Settings", link: "/settings", icon: faGear },
		{ name: "About", link: "/about", icon: faQuestion },
	];

	return (
		<StyledNav
			isOpen={isOpen}
			onClick={(e) => {
				e.preventDefault(e);
				toggleClose();
			}}
		>
			{links.map((link, index) => (
				<Link to={link.link} key={index}>
					<LinkWrapper>
						<FontAwesomeIcon icon={link.icon} />
						<p>{link.name}</p>
					</LinkWrapper>
				</Link>
			))}
			<NavBottom />
		</StyledNav>
	);
};

export default Navbar;
