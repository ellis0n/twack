import { React, useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";

const Wrapper = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: row;
	height: 100vh;

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
	width: 25%;
	height: 100%;

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
	align-items: flex-start;
	justify-content: space-evenly;
	width: 100%;
	background-color: #58806124;
	border-radius: 5px;

	p {
		margin: 0;
	}
`;

const YourLists = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;

	p {
		font-size: 1.5em;
		color: #588061;
		background-color: #58806124;
		padding: 10px;
		border-radius: 5px;
		border: 2px solid #588061;
	}

	span {
		color: #f7e5e2;
		cursor: pointer;
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

	const [list, setList] = useState({});
	const [showDetails, setShowDetails] = useState(false);

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
		console.log(list);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<Banner />
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
						</InfoBox>
					)}
				</AdListWrapper>

				{currentUser === user && (
					<YourLists>
						<p>
							Click on an ad to view, or <span>here</span> to start twacking.
						</p>
					</YourLists>
				)}

				{list.ads &&
					list.ads.map((ad) => {
						return (
							<div>
								<h1>{ad.name}</h1>
								<h1>{ad.description}</h1>
								<h1>{ad.category}</h1>
								<h1>{ad.location}</h1>
							</div>
						);
					})}
			</Wrapper>
		</>
	);
};

export default ListDetail;
