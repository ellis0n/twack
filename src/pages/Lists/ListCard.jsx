import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faEdit,
	faPlus,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { categories, locations } from "../../helper/searchparams";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const ListWrapper = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
	width: 100%;
	background-color: #f7e5e2;
	border-radius: 5px;
	margin: 0.5rem 0rem;
	transition: transform 100ms, background 200ms;
	box-shadow: #000000 0px 2px 6px 0px;
	box-shadow: ${(props) =>
		props.sampleList ? "0 0 30px 8px #f7e5e27b;" : "#000000 0px 2px 6px 0px"};

	:hover {
		transform: scale(1.01);
		background-color: #f7e5e2e4;
		box-shadow: ${(props) =>
			props.createCard ? "#f7e5e2 0px 0px 2px 0px" : "#000000 0px 2px 3px 0px"};
		animation: ${(props) =>
			props.createCard ? "createPulse 2s infinite" : "pulse 1s infinite"};
	}

	p {
		text-decoration: none;
		color: #588061;
		font-size: 0.8em;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 #f7e5e2;
		}
		70% {
			box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
		}
		100% {
			box-shadow: 0 0 0 2px rgba(0, 0, 0, 0);
		}
	}

	@keyframes createPulse {
		0% {
			box-shadow: 0 0 0 0 #588061;
		}
		70% {
			box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: center;
	padding: 0.5rem 0rem;
	background-color: #588061;
	border-radius: 5px 5px 0 0;
	width: 100%;
	color: #f7e5e2;

	h2 {
		font-size: 2em;
		font-weight: 200;
		color: #f7e5e2;
		margin: 0.5rem 0rem;
	}
`;

const ParamWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
	width: 100%;
	height: auto;
	border-radius: 5px;
	margin: 0.5rem 0rem;
	transition: transform 100ms, background 200ms;
	filter: ${(props) => (props.createCard ? "blur(2px)" : "none")};
	h2 {
		text-align: center;
		font-weight: 200;
		color: #f7e5e2;
		margin: 0.5rem 0rem;
	}

	h3 {
		text-align: left;
		font-weight: 200;
		color: #588061;
		margin: 0.5rem 0.5rem;
		font-size: 0.8em;
		border-bottom: #588061 1px solid;
		width: 100%;
	}

	p {
		font-weight: 200;
		color: #588061;
		margin: 0.5rem 0rem;
		padding-left: 24px;
	}
`;

const DescriptionWrapper = styled.div`
	display: flex;
	justify-content: left;
	border-radius: 0px 5px 5px 0px;
	background-color: aliceblue;
	width: 100%;
	height: 100%;
	box-shadow: #588061 0px 2px 5px 0px;
	margin-left: 0;

	p {
		text-align: left;

		font-weight: 200;
		color: #588061;
		margin: 0.5rem;
		font-size: 0.7em;
		line-height: 1.4rem;
		padding-left: 0px;
	}
`;

const ImageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 0;
	width: 100%;

	img {
		width: 150px;
		height: 150px;
		margin: 0 0.5rem;
		border-radius: 8px;
		z-index: 0;
		opacity: 0.9;

		@media (max-width: 768px) {
			width: 100px;
			height: 100px;
		}
	}

	.create {
		margin: 0 0.5rem;
		width: calc(150 - 0.5rem);
		height: 150px;
		display: flex;
		justify-content: center;
		opacity: 0.9;
		color: #f7e5e2;
		background-color: #588061;
		border: 1px solid #588061;
		border-radius: 50%;
		cursor: pointer;
		animation: createPulse 2s infinite;

		:hover {
			background-color: #588061d8;
			color: #f7e5e2ea;
		}

		@media (max-width: 768px) {
			font-size: 4rem;
		}
	}
`;

const IconWrapper = styled.div`
	display: flex;

	position: relative;
	flex-direction: row;
	/* justify-content: end; */
	padding: 0.5rem 0rem;
	border-radius: 0 0 5px 5px;
	z-index: 0;
	svg {
		font-size: 1.5rem;
		color: #588061;
		margin: 0.5rem 0rem;
		cursor: pointer;
		border: 1px solid #588061;
		border-radius: 50%;
		padding: 0.5rem;
		margin: 0.5rem;
		transition: transform 100ms, background 200ms;
		:hover {
			transform: scale(1.1);
			background-color: #588061;
			color: #f7e5e2;
		}
	}

	p {
		font-size: 0.8rem;
		color: #588061;
		margin: 0.5rem 0rem;
	}
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.5rem 0rem;
	width: 100%;
`;

const ListCard = ({
	currentUser,
	list,
	deleteList,
	updateList,
	createCard,
	handleNewList,
	ownedCard,
	followList,
	openLink,
}) => {
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const stateLocation = useLocation();
	const [following, setFollowing] = useState(false);
	const [refreshFollowing, setRefreshFollowing] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getFollowing = async () => {
			try {
				const response = await axiosPrivate.get(
					`/users/${currentUser}/following/${list._id}`,
					{
						signal: controller.signal,
					}
				);
				isMounted && setFollowing(response.data);
			} catch (error) {
				console.error(error);
				navigate("/", { state: { from: stateLocation }, replace: true });
			}
		};

		getFollowing();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const findString = (value, type) => {
		const found = type.find((category) => category.value === parseInt(value));
		return found.key ? found.key : "no category";
	};

	console.log(list);
	return (
		<Link to={createCard ? null : `${list._id}`}>
			<ListWrapper
				createCard={createCard}
				onClick={createCard ? handleNewList : null}
			>
				<Header createCard={createCard}>
					<h2>{list.name}</h2>
				</Header>

				<BodyWrapper>
					<ParamWrapper createCard={createCard}>
						<h3>Category: </h3>
						<p>{findString(list.category, categories)}</p>
						<h3>Location: </h3>
						<p>{findString(list.location, locations)}</p>
					</ParamWrapper>
					<ImageWrapper>
						{createCard ? (
							<FontAwesomeIcon icon={faPlus} className="create" />
						) : list.ads[0] && list.ads[0].images.length > 0 ? (
							<img src={list.ads[0].images[0]} alt="list" />
						) : (
							<img src="https://via.placeholder.com/150" alt="list" />
						)}

						<IconWrapper>
							{!createCard && ownedCard ? (
								<>
									<FontAwesomeIcon
										icon={faTrash}
										onClick={(e) => {
											e.preventDefault();
											deleteList(list._id);
										}}
									/>
									<FontAwesomeIcon
										icon={faEdit}
										onClick={(e) => {
											e.preventDefault();
											updateList(list._id);
										}}
									/>
								</>
							) : (
								<>
									<FontAwesomeIcon
										icon={faEdit}
										style={{ visibility: "hidden" }}
									/>
								</>
							)}
							{createCard && ownedCard ? (
								<FontAwesomeIcon
									icon={faPlus}
									onClick={(e) => {
										e.preventDefault();
										openLink(list._id);
									}}
								/>
							) : null}
							{!createCard && !ownedCard ? (
								<>
									{following ? (
										<>
											<p>Unfollow: </p>
											<FontAwesomeIcon
												icon={faCheck}
												onClick={(e) => {
													e.preventDefault();

													followList(list._id);

													setFollowing(false);
												}}
											/>
										</>
									) : (
										<>
											<p>Follow:</p>
											<FontAwesomeIcon
												icon={faPlus}
												onClick={(e) => {
													e.preventDefault();
													followList(list._id);
													setFollowing(true);
												}}
											/>
										</>
									)}
								</>
							) : null}
						</IconWrapper>
					</ImageWrapper>
				</BodyWrapper>
				<DescriptionWrapper>
					{list.description ? <p>{list.description}</p> : null}
				</DescriptionWrapper>
			</ListWrapper>
		</Link>
	);
};

export default ListCard;
