import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBanner = styled.div`
	font-weight: 900;
	color: #588061;
	font-family: "Fredoka One", cursive;
	justify-content: center;
	background-color: #e7b5ac;

	display: ${(props) => (props.theme === "landing" ? "block" : "flex")};

	justify-content: space-evenly;
	align-items: center;

	font-size: ${(props) => (props.theme === "landing" ? "3rem" : "2rem")};

	:hover {
		color: #869f77;
	}
`;

const MenuWrapper = styled.div`
	display: ${(props) => (props.theme === "landing" ? "none" : "block")};
`;

const Banner = ({ theme }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	console.log(theme);
	console.log(menuOpen);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<StyledBanner theme={theme}>
			<MenuWrapper
				theme={theme}
				onClick={(e) => {
					e.preventDefault();
					handleMenuClick();
				}}
			>
				<FontAwesomeIcon
					icon={faBars}
					color="white"
					size="xs"
					className="burger"
				/>
			</MenuWrapper>
			<Link to="/" className="logo-link">
				<h1>twack</h1>
			</Link>
		</StyledBanner>
	);
};

export default Banner;
