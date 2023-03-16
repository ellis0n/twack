import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Searchbar from "./Searchbar";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0.5rem 0rem;
	overflow: hidden;

	svg {
		position: absolute;
		right: 20vw;
		background-color: #f7e5e2;
		cursor: pointer;
		/* margin: 0 12px; */
		font-size: 1em;
		color: #ff0000ca;
		/* padding: 6px 6px; */
		/* border-radius: 30%; */
		border: 1.5px solid #588061;

		:hover {
			background-color: red;
			color: #f7e5e2;
			transition: all 0.2s ease-in-out;
		}
	}
`;

const NewListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
	text-align: center;
	background-color: #588061;
	height: auto;
	min-height: 33vh;
	width: 100%;
	max-width: 50vw;
	border: #f7e5e2 solid 2px;
	border-radius: 12px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
	overflow: hidden scroll;

	h1 {
		font-weight: 200;
		border-bottom: 2px solid #f7e5e2;
		color: #f7e5e2;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0rem;
	}

	label {
		font-weight: 200;
		color: #f7e5e2;
		border-bottom: 2px solid #f7e5e2;
	}

	input {
		width: 75%;
		border: 2px solid #f7e5e2;
		border-radius: 4px;
		padding: 0.5rem 0.5rem;
		margin: 0.5rem 0rem;
		background-color: #f3ebe9;
	}
`;

const NewList = ({ onClick }) => {
	const [listName, setListName] = useState("");
	const [listDescription, setListDescription] = useState("");
	const [locations, setLocations] = useState([]);
	const [categories, setCategories] = useState([]);

	const handleClick = () => {
		console.log("clicked");
	};

	return (
		<CardWrapper>
			<NewListWrapper>
				<FontAwesomeIcon icon={faTimes} onClick={onClick} />
				<h1>New List</h1>
				<form>
					<label htmlFor="listName">List Name: </label>
					<input type="text" id="listName" />
					<label htmlFor="listDescription"> Description: </label>
					<input type="text" id="listDescription" />
					<Searchbar />
					<Button onClick={handleClick} label="Create List" />
				</form>
			</NewListWrapper>
		</CardWrapper>
	);
};

export default NewList;
