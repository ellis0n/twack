import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const AdPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f7e5e2;
	text-align: center;
	margin-top: 60px;
	h1 {
		color: #588061;
	}
`;

const AdPage = () => {
	return (
		<AdPageWrapper>
			<p>Glen</p>
		</AdPageWrapper>
	);
};

export default AdPage;
