import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Banner from "./Banner";

const AppWrapper = styled.div`
	text-align: center;
	font-family: "Fredoka", cursive;
	background-color: #e7b5ac;
	display: grid;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 0px;
	grid-row-gap: 0px;

	height: 100vh;
	width: 100vw;
	overflow: hidden;
	transition: all 0.1s ease-in-out;

	/* @media (max-width: 768px) {
		grid-template-areas:
			"banner"
			"content"
			"settingbar";
	} */

	* {
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
		color: #f7e5e2e1;
	}

	/* h1 {
		font-size: calc(2rem + 2vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
		font-weight: 700;
	}

	h2 {
		font-size: calc(1rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
		font-weight: 700;
	}

	h3 {
		font-size: calc(1rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
		font-weight: 700;
	}

	h4 {
		font-size: calc(1rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
		font-weight: 700;
	}

	h5 {
		font-size: calc(1rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
		font-weight: 700;
	}

	h6 {
		font-size: calc(1rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
		font-weight: 700;
	}

	p {
		font-size: calc(1rem + 1vw);
		margin: 0;
		animation: slideIn 0.8s ease-out forwards;
	} */
`;

const Sidebar = styled.div`
	grid-area: 2 / 1 / 6 / 2;

	/* display: flex; */
	/* flex-direction: column; */
	/* justify-content: flex-start; */
	/* align-items: center; */
	/* height: 100vh; */
	/* background: #e7b5ac; */
	/* transition: all 0.1s ease-in-out; */
	/* z-index: 1; */
	/* box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75); */

	@media (max-width: 768px) {
		display: none;
	}
`;

const BannerWrapper = styled.div`
	/* position: fixed; */
	/* z-index: 2; */
	grid-area: 1 / 1 / 2 / 6;
`;

const ContentWrapper = styled.div`
	grid-area: 2 / 2 / 3 / 4;
	display: flex;
	flex-direction: column;
	justify-content: flex;
	height: calc(100vh - 3rem);
	width: 100%;
	transition: all 0.1s ease-in-out;
	z-index: 0;

	/* align-items: center; */
`;

const SettingBar = styled.div`
	grid-area: 2 / 4 / 3 / 5;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: calc() (100vh - 3rem);
	transition: all 0.1s ease-in-out;
	z-index: 0;
	width: 100%;
	background-color: red !important;

	@media (max-width: 768px) {
		display: none;
		position: fixed;
		z-index: 2;
	}
`;

const Layout = () => {
	return (
		<AppWrapper>
			<BannerWrapper>
				<Banner />
			</BannerWrapper>
			<ListDetail />
			<ContentWrapper>
				<Outlet />
			</ContentWrapper>
			<SettingBar />
		</AppWrapper>
	);
};

export default Layout;
