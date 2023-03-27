import React from "react";
import styled from "styled-components";
import Lists from "../Lists/Lists";
import Banner from "../../components/Banner";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2% 12.5%;
	margin-top: 60px;
`;

const UserLists = () => {
	return (
		<>
			<Banner theme="header" />
			<Lists />
		</>
	);
};

export default UserLists;
