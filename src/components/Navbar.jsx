import React from "react";
import { Link } from "react-router-dom";
import Styled from "styled-components";

const StyledNav = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  /* font-size: 3rem; */
  font-weight: 600;
  z-index: 1;
  width: 95vh;
  height: 100vh;


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

const LinkWrapper = Styled.div`
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
  transition: transform 900ms, background 1550ms;
  &:hover {
    transform: scale(1.02);
    color: rgba(255, 255, 255, 0.774);
    outline: black;
    transition: transform 900ms, background 1550ms;
  }
`;
const Navbar = ({ onClick }) => {
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
		<StyledNav>
			{links.map((link, index) => {
				return (
					<LinkWrapper>
						<Link key={index} to={link.link}>
							{link.name}
						</Link>
					</LinkWrapper>
				);
			})}
		</StyledNav>
	);
};

export default Navbar;
