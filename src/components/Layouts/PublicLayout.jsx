import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import App from "../../App";

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: calc(6rem + 2vw);
		color: #588061;
		margin: 0;
		padding: 0;
	}
`;

const PublicLayout = () => {
	return (
		<AppWrapper>
			<Outlet />
		</AppWrapper>
	);
};

export default PublicLayout;
