import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { categories, locations } from "../../helper/searchparams";

const BlurDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: ${(props) => (props.isOpen ? "#00000092" : "none")};
	z-index: 0;
	backdrop-filter: ${(props) => (props.isOpen ? "blur(.7px)" : "none")};
`;

const NewListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	background-color: #588061;
	top: 33%;
	width: 100%;
	max-width: 60vw;
	border: #f7e5e2 solid 2px;
	border-radius: 12px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
	position: absolute;

	@media (max-width: 1024px) {
		max-width: 65vw;
	}

	@media (max-width: 768px) {
		max-width: 75vw;
	}

	@media (max-width: 500px) {
		max-width: 85vw;
	}

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
		text-align: center;
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

	button {
		width: 40%;
		border: none;
		border-radius: 4px;
		padding: 0.5rem 0.5rem;
		margin: 0.5rem 0rem;
		background-color: #f7e5e2;

		&:hover {
			background-color: #f7e5e2e4;
		}
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
		font-weight: 200;

		color: #588061;
		margin: 0.5rem 0rem;
		/* padding: 0.5rem 0rem; */
	}
	svg {
		z-index: 1;
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
		padding: 0.5rem 0.5rem;
		transition: all 0.2s ease-in-out;
		:hover {
			background-color: #588061;
			color: #f7e5e2;
			transition: all 0.2s ease-in-out;
			border: 1.5px solid #000;
			z-index: 1;
		}
	}
`;
const NewList = ({ onClick, onSubmit }) => {
	// const [showAddParam, setShowAddParam] = useState(false);

	const [list, setList] = useState({
		listName: "New List",
		listDescription: "",
		category: "0",
		location: "0",
	});

	const handleSubmit = () => {
		onSubmit(list);
		setList({
			listName: "New List",
			listDescription: "",
			category: "0",
			location: "0",
		});
		onClick();
	};

	const handleInputChange = (event) => {
		const { name } = event.target;
		if (name === "category") {
			setList({ ...list, category: parseInt(event.target.value) });
		} else if (name === "location") {
			setList({ ...list, location: parseInt(event.target.value) });
		} else {
			setList({ ...list, [name]: event.target.value });
		}
	};

	return (
		<BlurDiv isOpen={true}>
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
							max={20}
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
		</BlurDiv>
	);
};

export default NewList;
