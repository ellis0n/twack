import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/Button";
import NewList from "./NewList";
import useAuth from "../../hooks/useAuth";
import ListComponent from "./ListComponent";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
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

const ListsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	align-items: center;
	justify-items: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const Lists = () => {
	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();
	const navigate = useNavigate();
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
				console.log(response);
				isMounted && setLists(response.data);
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

	const submitNewList = async (newList) => {
		const user = auth.user;
		console.log(newList);
		try {
			const response = await axiosPrivate.post(
				"/lists",
				JSON.stringify({ newList, user: user }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Banner theme="header" />
			<Wrapper>
				<h1>Lists</h1>
				<ListsWrapper>
					{lists.map((list, i) => (
						<ListComponent key={i} list={list} />
					))}
				</ListsWrapper>
				{showCreateList ? (
					<NewList
						onClick={() => {
							setShowCreateList(!showCreateList);
						}}
						onSubmit={submitNewList}
					/>
				) : (
					<Button
						label="Create a list"
						handleClick={() => setShowCreateList(!showCreateList)}
					/>
				)}
			</Wrapper>
		</>
	);
};

export default Lists;
