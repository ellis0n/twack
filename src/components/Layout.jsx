import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Banner from "./Banner";

const AppWrapper = styled.div`
	text-align: center;
	font-family: "Fredoka", cursive;
	background-color: #e7b5ac;
`;

const Layout = () => {
	return (
		<AppWrapper>
			<Banner />
			<Outlet />
		</AppWrapper>
	);
};

export default Layout;
