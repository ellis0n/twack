import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { categories, locations } from "../helper/searchparams";

const NewListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	background-color: #588061;
	height: 100%;

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

	select {
		width: 75%;
		border: none;
		height: 2rem;
		border-radius: 4px;
		border: 2px solid #f7e5e2;
		text-align: center;
		margin: 0.5rem 0rem;
	}
	option {
		text-align: center;
		overflow: hidden;
	}
`;

const FormSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
	justify-content: center;
`;

const ListTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: #f3ebe9e1;
	width: 100%;
	border-radius: 8px 9px 0 0;
	h1 {
		position: relative;
		font-weight: 200;

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
	// const [showAddParam, setShowAddParam] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");

	const [list, setList] = useState({
		listName: "New List",
		listDescription: "",
		category: "",
		location: "",
	});

	const handleSubmit = () => {
		console.log(list);
		// setShowAddParam(false);
		setList({
			listName: "New List",
			listDescription: "",
		});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === "category") {
			const selectedCategories = Array.from(
				event.target.selectedOptions,
				(option) => option.value
			);
			setList({ ...list, category: selectedCategories });
		} else if (name === "location") {
			const selectedLocations = Array.from(
				event.target.selectedOptions,
				(option) => option.value
			);
			setList({ ...list, location: selectedLocations });
		} else {
			setList({ ...list, [name]: value });
		}
	};

	return (
		<NewListWrapper>
			<ListTitle>
				<FontAwesomeIcon icon={faTimes} onClick={onClick} />
				<h1>{list.listName}</h1>
			</ListTitle>
			<form
				onSubmit={() => {
					handleSubmit();
				}}
			>
				<FormSection>
					<label>List Name: </label>
					<input
						type="text"
						name="listName"
						value={list.listName}
						onChange={handleInputChange}
					/>
				</FormSection>
				<FormSection>
					<label> Description: </label>
					<input
						type="text"
						name="listDescription"
						value={list.listDescription}
						onChange={handleInputChange}
					/>
				</FormSection>

				{/* {!showAddParam ? ( */}
				{/* <FormSection>
					<div>
						<Button
							label="Add new search parameter"
							handleClick={() => {
								setShowAddParam(true);
							}}
						/>
					</div>
				</FormSection> */}
				{/* ) : ( */}
				<>
					<FormSection>
						<label>Category</label>
						<select
							multiple={false}
							id="category"
							name="category"
							onChange={handleInputChange}
						>
							{categories.map((category, i) => {
								return (
									<option value={category.value} key={i}>
										{category.key}
									</option>
								);
							})}
						</select>
					</FormSection>
					<FormSection>
						<label>Location</label>
						<select
							multiple={false}
							id="location"
							name="location"
							onChange={handleInputChange}
						>
							{locations.map((location, i) => {
								return (
									<option value={location.value} key={i}>
										{location.key}
									</option>
								);
							})}
						</select>
					</FormSection>
					<Button handleClick={handleSubmit} label="Submit" />
				</>
				{/* )} */}
			</form>
		</NewListWrapper>
	);
};

export default NewList;
