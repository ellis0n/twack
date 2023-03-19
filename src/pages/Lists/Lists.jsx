import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/Button";
import NewList from "../../components/NewList";

const ListsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: calc(100vh - 60px);
	z-index: 2;

	button {
		background-color: aliceblue;
		border: none;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		margin: 1rem 0rem;
		cursor: pointer;
	}
`;

const Lists = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const stateLocation = useLocation();

	const [lists, setLists] = useState([]);
	const [showCreateList, setShowCreateList] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getLists = async () => {
			try {
				const response = await axiosPrivate.get("/lists", {
					signal: controller.signal,
				});
				isMounted && setLists(response.data.lists);
			} catch (err) {
				console.error(err);
				// navigate("/login", { state: { from: stateLocation }, replace: true });
			}
		};
		getLists();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<Banner theme="header" />
			<ListsWrapper>
				<h1>Lists</h1>

				{showCreateList ? (
					<NewList
						onClick={() => {
							setShowCreateList(!showCreateList);
						}}
					/>
				) : (
					<Button
						label="Create a list"
						handleClick={() => setShowCreateList(!showCreateList)}
					/>
				)}
				{lists.length === 0 ? (
					<>
						<p>No lists found 😢</p>
					</>
				) : (
					lists.map((list, i) => (
						<div key={i}>
							<h2>{list.name}</h2>
						</div>
					))
				)}
			</ListsWrapper>
		</>
	);
};

export default Lists;
