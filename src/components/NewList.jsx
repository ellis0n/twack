import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { categories, locations } from "../helper/searchparams";
import Dropdown from "./Dropdown";

const NewListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	background-color: #588061;
	/* height: auto; */
	/* min-height: 59vh; */

	width: 100%;
	max-width: 50vw;
	border: #f7e5e2 solid 2px;
	border-radius: 12px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
	/* overflow: hidden; */

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		height: 75%;
		margin-top: 1rem;
	}

	label {
		padding: 0;
		margin: 0;
		font-weight: 200;
		color: #f7e5e2;
		border-bottom: 2px solid #f7e5e2;
	}

	input {
		width: 75%;
		border: none;
		border-radius: 4px;
		padding: 0.5rem 0.5rem;
		margin: 0.5rem 0rem;
		background-color: #f3ebe9;
	}
`;

const FormSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	justify-content: center;
`;

const ListTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: #f3ebe9e1;
	width: 100%;
	h1 {
		position: relative;
		font-weight: 200;
		/* border-bottom: 2px solid #588061; */
		color: #588061;
		margin: 0.5rem 0rem;
		/* padding: 0.5rem 0rem; */
	}
	svg {
		position: absolute;
		align-self: flex-end;
		width: 1em;
		background-color: #588061;
		cursor: pointer;
		font-size: 1.2em;
		color: #f7e5e2;
		border-radius: 50%;
		border: 1.5px solid #f3ebe9;
		margin: 0.5rem 0.5rem;
		z-index: 1;
		:hover {
			background-color: #588061;
			color: #f7e5e2;
			transition: all 0.2s ease-in-out;
			border: 1.5px solid #000;
		}
	}
`;

const NewList = ({ onClick }) => {
	const [listName, setListName] = useState("New List");
	const [listDescription, setListDescription] = useState("");
	const [listLocations, setListLocations] = useState([]);
	const [listCategories, setListCategories] = useState([]);

	const handleClick = () => {
		const newList = {
			listName,
			listDescription,
			listLocations,
			listCategories,
		};
		console.log(newList);
	};

	console.log();

	return (
		// <CardWrapper>
		<NewListWrapper>
			<ListTitle>
				<FontAwesomeIcon icon={faTimes} onClick={onClick} />
				<h1>{listName}</h1>
			</ListTitle>
			<form>
				<FormSection>
					<label htmlFor="listName">List Name: </label>
					<input
						type="text"
						id="listName"
						onChange={(e) => {
							e.target.value === ""
								? setListName("New List")
								: setListName(e.target.value);
						}}
					/>
				</FormSection>
				<FormSection>
					<label htmlFor="listDescription"> Description: </label>
					<input type="text" id="listDescription" />
				</FormSection>

				<FormSection>
					<Dropdown options={categories} label="Categories" />
				</FormSection>
				<FormSection>
					<Dropdown options={locations} label="Locations" />
				</FormSection>
				<Button onClick={handleClick()} label="Create List" />
			</form>
		</NewListWrapper>
		// </CardWrapper>
	);
};

export default NewList;
