import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styled from "styled-components";
import {
	useNavigate,
	useLocation,
	useParams,
	Navigate,
	Link,
} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/Button";
import NewList from "./NewList";
import useAuth from "../../hooks/useAuth";
import ListComponent from "./ListComponent";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2% 12.5%;
	margin-top: 60px;
	h1 {
		/* margin: 1rem 0rem; */
		color: #588061;
	}
	a {
		text-decoration: none;
	}
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 75%;
	padding: 1rem 0rem;
	margin: 1rem 1rem;
	background-color: #58806124;
	border-radius: 5px;
	border: 2px solid #588061;

	button {
		background-color: #f7e5e2;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 100%;
		width: 33%;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
		color: #588061;
		font-size: 1.4em;

		&:hover {
			background-color: #f7e5e2e4;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 200;
		color: #f7e5e2;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 0.5rem 0rem;
		margin: 1rem 0rem 1rem 0rem;

		button {
			width: 75%;
			height: 2rem;
			font-size: 1rem;
		}

		h1 {
			font-size: 2rem;
		}
	}
`;

const SelectView = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 75%;
	padding: 1rem 0rem;

	button {
		background-color: #f7e5e2;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 100%;
		width: 10%;
		margin: 0.5rem 0rem;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
		color: #588061;
		font-size: 1em;

		&:hover {
			background-color: #f7e5e2e4;
		}
	}
`;

const ListsWrapper = styled.div`
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	align-items: center;
	justify-items: center;
	max-width: 1200px;
	width: 100%;
	height: 100%;
`;

const OverLayNewList = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000000a6;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Lists = () => {
	const { id } = useParams();
	const axiosPrivate = useAxiosPrivate();
	const { auth, persist } = useAuth();
	const user = id ? id : localStorage.getItem("user").replace(/"/g, "");
	const navigate = useNavigate();
	const stateLocation = useLocation();

	const [lists, setLists] = useState([]);
	const [showCreateList, setShowCreateList] = useState(false);
	const [viewType, setViewType] = useState("grid");
	const [refreshList, setRefreshList] = useState(false);

	const sampleList = {
		name: "Create New List",
		description: "Get started!",
		category: "0",
		location: "0",
	};
	console.log(id);
	useEffect(() => {
		console.log(persist);
		let isMounted = true;
		const controller = new AbortController();
		const getLists = async () => {
			try {
				const response = await axiosPrivate.get(`/users/${user}/lists`, {
					// signal: controller.signal,
				});
				// isMounted &&
				setLists(response.data);
			} catch (err) {
				console.error(err);
				navigate("/home", { state: { from: stateLocation }, replace: true });
			}
		};
		getLists();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [refreshList, auth]);

	const submitNewList = async (newList) => {
		try {
			const response = await axiosPrivate.post(
				`users/${user}/lists`,
				JSON.stringify({ newList, user: user }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			setRefreshList(!refreshList);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteList = async (id) => {
		try {
			const response = await axiosPrivate.delete(`users/${user}/lists/${id}`);
			if (response.status === 200) {
				setLists(lists.filter((list) => list._id !== id));
				console.log("List deleted");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const updateList = async (id, updatedList) => {
		try {
			const response = await axiosPrivate.put(`/lists/${id}`, updatedList);
			if (response.status === 200) {
				const newList = lists.map((list) => {
					if (list._id === id) {
						return updatedList;
					}
					return list;
				});
				console.log("List updated");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const followList = async (id) => {
		try {
			// TODO: implement follow list
			console.log("you followed ", id);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Banner theme="header" isSticky={showCreateList} />
			<Wrapper>
				<Header>
					<>
						<h1>{user}'s Lists</h1>
					</>
				</Header>
				<SelectView>
					<Button label="Grid" handleClick={() => setViewType("grid")} />
					<Button label="List" handleClick={() => setViewType("list")} />
				</SelectView>
				{showCreateList ? (
					<NewList
						onClick={() => {
							setShowCreateList(!showCreateList);
						}}
						onSubmit={submitNewList}
					/>
				) : null}
				<ListsWrapper>
					{lists.map((list, i) => (
						<ListComponent
							key={i}
							list={list}
							createCard={false}
							deleteList={deleteList}
							updateList={updateList}
							followList={followList}
							ownedCard={
								user === localStorage.getItem("user").replace(/"/g, "")
									? true
									: false
							}
						/>
					))}

					{id ? null : (
						<ListComponent
							list={sampleList}
							deleteList={() => null}
							updateList={() => null}
							createCard={true}
							handleNewList={() => setShowCreateList(!showCreateList)}
						/>
					)}
				</ListsWrapper>
			</Wrapper>
		</>
	);
};

export default Lists;
