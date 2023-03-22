import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
	width: 100%;
	height: 100%;
	background-color: #f7e5e2;
	border-radius: 5px;
	margin: 0.5rem 0rem;
	transition: transform 100ms, background 200ms;
	box-shadow: #000000 0px 2px 6px 0px;
	h2 {
		font-weight: 200;
		color: #f7e5e2;
		margin: 0.5rem 0rem;
	}
	p {
		font-weight: 200;
		color: #588061;
		margin: 0.5rem 0rem;
		padding-left: 24px;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	background-color: #588061;
	border-radius: 5px 5px 0 0;
	width: 100%;
	height: 2rem;

	h2 {
		font-weight: 200;
		color: #f7e5e2;
		margin: 0.5rem 0rem;
	}
`;

const ListComponent = ({ list, deleteList }) => {
	return (
		<ListWrapper>
			<Header>
				<h2>{list.name}</h2>
			</Header>
			{list.description ? (
				<p>{list.description}</p>
			) : (
				<p>"placeholder text from list component"</p>
			)}
			<p>{list.category}</p>
			<p>{list.location}</p>
			<FontAwesomeIcon
				icon={faTrash}
				onClick={(e) => {
					e.preventDefault();
					deleteList(list._id);
				}}
			/>
		</ListWrapper>
	);
};

export default ListComponent;
