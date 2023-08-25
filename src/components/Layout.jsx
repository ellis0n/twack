import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Banner from "./Banner";

const AppWrapper = styled.div`
	text-align: center;
	font-family: "Fredoka", cursive;
	background-color: #e7b5ac;
	display: grid;
	grid-template-areas:
		"banner banner banner banner"
		"sidebar content content settingbar";

	height: 100vh;
	width: 100vw;
	overflow: hidden;
	transition: all 0.1s ease-in-out;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-template-rows: 0.1fr 1fr 0.1fr;
	}

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
	grid-area: sidebar;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 100vh;
	background: #588061;
	transition: all 0.1s ease-in-out;
	z-index: 1;

	@media (max-width: 768px) {
		/* display: none; */
		/* grid-area: unset; */
	}
`;

const BannerWrapper = styled.div`
	position: fixed;
	grid-area: banner;
	z-index: 2;
`;

const ContentWrapper = styled.div`
	grid-area: content;
	/* display: flex; */
	/* flex-direction: column; */
	/* justify-content: flex; */
	/* align-items: center; */
	height: 100vh;
	/* width: 100%; */
	transition: all 0.1s ease-in-out;
	z-index: 0;
	margin-top: 3rem;
`;

const SettingBar = styled.div`
	grid-area: settingbar;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 100vh;
	background: #588061;
	transition: all 0.1s ease-in-out;
	z-index: 0;
	height: calc() (100vh - 3rem);
`;

const Layout = () => {
	return (
		<AppWrapper>
			<BannerWrapper>
				<Banner />
			</BannerWrapper>
			<Sidebar />
			<ContentWrapper>
				<Outlet />
			</ContentWrapper>
			<SettingBar />
		</AppWrapper>
	);
};

export default Layout;
