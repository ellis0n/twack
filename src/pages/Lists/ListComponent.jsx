import React from "react";
import styled from "styled-components";

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
	width: 50%;
	background-color: #f7e5e2;
	border-radius: 5px;
	border: 1px solid #f7e5e2;
	margin: 1rem 0rem;
	padding: 1rem 0rem;
	h2 {
		font-weight: 200;
		color: #f7e5e2;
		margin: 0.5rem 0rem;
		background-color: #588061;
	}
	p {
		font-weight: 200;
		color: #588061;
		margin: 0.5rem 0rem;
		padding-left: 24px;
	}
`;

const ListComponent = ({ list, key }) => {
	return (
		<ListWrapper key={key}>
			<h2>{list.name}</h2>
			{list.description ? <p>{list.description}</p> : <p>"placeholder"</p>}
			<p>{list.category}</p>
			<p>{list.location}</p>
		</ListWrapper>
	);
};

export default ListComponent;
