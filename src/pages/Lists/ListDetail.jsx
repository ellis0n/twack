import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import Ads from "../../components/Ads";
import Ad from "../../components/Ad";

const Wrapper = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: row;

	a {
		text-decoration: none;
		color: inherit;
	}

	svg {
		cursor: pointer;
		padding-left: 5px;
	}
`;

const AdListWrapper = styled.div`
	margin-top: 20px;
	border: 1px solid #588061;
	border-radius: 0px 5px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	background-color: #f7e5e2e4;
	text-align: left;
	width: 33%;
	height: 100%;
	min-height: 100vh;

	h2 {
		width: 100%;
		font-size: 1em;
		margin: 0;
		border-bottom: 1px solid #588061;
		text-align: right;
		color: #588061;
		background-color: #58806124;
	}

	p {
		margin: 0;
		padding: 0;
	}
`;
const ListHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #588061;

	h1 {
		color: #f7e5e2e4;
		margin: 0;
		font-size: 1.5em;
	}
`;

const ListSubHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #58806124;
	border-bottom: 1px solid #588061;
`;

const InfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	background-color: #f7e5e2e4;
	box-shadow: #f7e5e2 0px 2px 5px 0px;
	color: #588061;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;

	span {
		color: #f7e5e2;
		cursor: pointer;
	}
`;

const AdLine = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - 20px);
	background-color: #58806124;
	box-shadow: #588061 0px 2px 5px 0px;
	padding: 5px 10px;
	color: #588061;
	cursor: pointer;

	p {
		margin: 0;
		padding: 0;
	}

	&:hover {
		background-color: #588061;
		color: #f7e5e2;
	}
`;

const ListDetail = () => {
	const axiosPrivate = useAxiosPrivate();
	const user = useParams().user;
	const id = useParams().listId;
	const navigate = useNavigate();
	const stateLocation = useLocation();
	const { auth } = useAuth();
	const decodedToken = jwtDecode(auth.accessToken);
	const currentUser = decodedToken.username;

	const [showAd, setShowAd] = useState(false);
	const [list, setList] = useState({});
	const [showDetails, setShowDetails] = useState(false);
	const [refreshList, setRefreshList] = useState(false);
	const [viewSavedAd, setViewSavedAd] = useState(false);
	const [currentAd, setCurrentAd] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUserList = async () => {
			window.scrollTo(0, 0);
			try {
				const response = await axiosPrivate.get(`/users/${user}/lists/${id}`, {
					signal: controller.signal,
				});
				isMounted && setList(response.data);
			} catch (error) {
				console.error(error);
				navigate("/", { state: { from: stateLocation }, replace: true });
			}
		};
		getUserList();
		console.log(viewSavedAd, currentAd, showAd);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [refreshList]);

	return (
		<>
			<Wrapper>
				<AdListWrapper>
					<ListHeader>
						<h1>{list.name}</h1>
					</ListHeader>
					<ListSubHeader>
						<FontAwesomeIcon
							icon={showDetails ? faArrowDown : faArrowUp}
							onClick={() => {
								setShowDetails(!showDetails);
							}}
						/>
						<h2>
							by: <Link to={`/${user}/lists`}>{user}</Link>
						</h2>
					</ListSubHeader>

					{showDetails && (
						<InfoBox>
							<p>{list.description}</p>
							<p>{list.category}</p>
							<p>{list.location}</p>
							<p>{list.followers}</p>
						</InfoBox>
					)}

					{list.ads &&
						list.ads.map((ad) => {
							return (
								<AdLine
									key={ad.id}
									onClick={() => {
										setShowAd(true);
										setCurrentAd(ad);
										setViewSavedAd(true);
									}}
								>
									<p>{ad.title}</p>
									<p>${ad.price}</p>
								</AdLine>
							);
						})}
				</AdListWrapper>

				{currentUser === user && (
					<Container>
						<h1>{list.name}</h1>
						<br />
						{showAd ? (
							!viewSavedAd ? (
								<Ads
									listInfo={list}
									onRefresh={() => setRefreshList(!refreshList)}
								/>
							) : (
								currentAd && (
									<>
										<div
											onClick={() => {
												setCurrentAd(null);
												setViewSavedAd(false);
											}}
										>
											Click to close
										</div>
										<Ad
											ad={currentAd}
											listId={id}
											handleClick={() => {
												return null;
											}}
										/>
									</>
								)
							)
						) : (
							<p>
								Click on an ad to view, or
								<span
									onClick={() => {
										setShowAd(true);
									}}
								>
									{" "}
									here{" "}
								</span>
								to find new ads.
							</p>
						)}
					</Container>
				)}
				{currentUser !== user && (
					<Container>
						{showAd ? (
							currentAd && (
								<Ad
									id={currentAd.id}
									url={currentAd.url}
									title={currentAd.title}
									alt={currentAd.desc}
									src={currentAd.img}
									price={currentAd.price}
									desc={currentAd.desc}
									images={currentAd.images}
									date={currentAd.date}
									location={currentAd.location}
								/>
							)
						) : (
							<p>Click on an ad to view.</p>
						)}
					</Container>
				)}
			</Wrapper>
		</>
	);
};

export default ListDetail;
