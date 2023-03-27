import React from "react";
import styled from "styled-components";
import Banner from "../../components/Banner";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2% 12.5%;
	margin-top: 60px;
`;

const UserList = () => {
	return (
		<>
			<Banner theme="header" />
			<Wrapper>
				<h1>Users</h1>
			</Wrapper>
		</>
	);
};

export default UserList;
