import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

const BannerWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100vw;
	height: 60px;
	padding: 0 12px;
	position: relative;
	top: 0;
	background-color: #f7e5e2;
`;

const StyledBanner = styled.div`
	position: fixed;
	top: 0;
	color: #588061;
	font-family: "Fredoka One", cursive;
	align-items: center;
	z-index: 1000;
	display: flex;

	svg {
		display: inline-block;
		background-color: #f7e5e2;
		cursor: pointer;
		margin: 0 12px;
		font-size: 1em;
		color: #588061;
		padding: 6px 6px;
		border-radius: 48%;
		border: 1.5px solid #588061;

		:hover {
			background-color: #588061dd;
			color: #f7e5e2;
			transition: all 0.2s ease-in-out;
		}
	}

	h1 {
		font-size: calc(1.8rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
	}

	button {
		display: inline-block;
		position: relative;
		border: 2px solid #588061;
		margin-left: auto;
		margin-right: 20px;
		background-color: #f7e5e2;
		color: #588061;
		padding: 10px 20px;
		border-radius: 24px;

		:hover {
			background-color: #588061c3;
			color: #f7e5e2;
			transition: 0.3s;
		}
	}

	a {
		text-decoration: none;
		color: #588061;
	}
`;

const Banner = ({ isSticky }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	const toggleClose = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<StyledBanner isOpen={isMenuOpen} isSticky={isSticky}>
				<BannerWrapper>
					<FontAwesomeIcon
						icon={faBars}
						onClick={(e) => {
							e.preventDefault();
							setIsMenuOpen(!isMenuOpen);
						}}
					/>
					<Link to="/">
						<h1>twack</h1>
					</Link>
					<Button
						label="Logout"
						handleClick={() => {
							signOut();
						}}
						wa
					/>
				</BannerWrapper>
			</StyledBanner>

			{isMenuOpen ? (
				<Navbar className="navbar" toggleClose={toggleClose} />
			) : null}
		</>
	);
};

export default Banner;
