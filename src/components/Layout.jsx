import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const AppWrapper = styled.div`
	text-align: center;
	font-family: "Fredoka One", cursive;
	background-color: #e7b5ac;
`;

const Layout = () => {
	return (
		<AppWrapper>
			<Outlet />
		</AppWrapper>
	);
};

export default Layout;
