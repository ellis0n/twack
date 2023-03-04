import React from "react";
import { Link } from "react-router-dom";
import Styled from "styled-components";
import ParamBox from "./ParamBox";

const StyledNav = Styled.div`
  display: ${(props) => (props.theme === "landing" ? "none" : "flex")};
  flex-direction: column;
  align-items: start;
  font-weight: 600;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background: #588061f6;
  position: fixed;
  transform: translateX(-100%);
  transition: transform 0.5s ease-in-out;
`;

const LinkWrapper = Styled.div`
  /* padding: 1rem; */
  margin: .4rem;
  border-radius: 5px;
  transition: transform 900ms, background 1550ms;

  &:hover {
	  transform: scale(1.02);
	  color: rgba(255, 255, 255, 0.774);
	  outline: black;
	  transition: transform 900ms, background 1550ms;
	}
	
	a {
	  text-decoration: none;
	  color: #fff;
	  font-family: "Fredoka One", cursive;
	  
	  &:hover {
	  color: rgba(255, 255, 255, 0.774);
	  outline: black;
	  background: #588061;
	  transition: transform 900ms, background 1550ms;
	  
	  }
	}
	`;
const Navbar = ({ isMenuOpen }) => {
	const links = [
		{
			name: "Home",
			link: "/home",
		},
		{
			name: "Ads",
			link: "/ads",
		},
		{
			name: "Saved",
			link: "/saved",
		},
		{
			name: "Users",
			link: "/users",
		},
		{
			name: "Settings",
			link: "/settings",
		},
	];

	return (
		<StyledNav
			style={{
				transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
			}}
		>
			{links.map((link, index) =>
				link.name === "Ads" ? (
					<LinkWrapper key={index}>
						{link.name}
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
