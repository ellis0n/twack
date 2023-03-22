import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ParamBox from "./ParamBox";
import Button from "./Button";
import BlurWrapper from "./BlurWrapper";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
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
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 65vw;
	height: calc(100vh - 60px);
	background: #588061;
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	transition: all 0.1s ease-in-out;
	border-right: 3px solid #f7e5e2e1;

	@media (min-width: 768px) {
		width: 30vw;
		position: fixed;
		visibility: visible;
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

const BlurDiv = styled.div`
	position: ${(props) => (props.theme === "landing" ? "relative" : "absolute")};
	width: 100vw;
	height: calc(100vh - 60px);
	background-color: ${(props) => (props.isOpen ? "#00000092" : "none")};
	z-index: ${(props) => (props.isOpen ? "1" : "0")};
	backdrop-filter: ${(props) => (props.isOpen ? "blur(.7px)" : "none")};
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

const Navbar = ({ isOpen }) => {
	const logout = useLogout();
	const navigate = useNavigate();

	const links = [
		{ name: "Home", link: "/home", icon: faHouse },
		{ name: "Your Lists", link: "/lists", icon: faList },
		{ name: "Community", link: "/users", icon: faUsers },
		{ name: "Settings", link: "/settings", icon: faGear },
		{ name: "About", link: "/about", icon: faQuestion },
	];

	return (
		<BlurDiv isOpen={isOpen}>
			<StyledNav isOpen={isOpen}>
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
		</BlurDiv>
	);
};

export default Navbar;
