import { React, useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Wrapper = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: row;
	height: 100vh;
`;

const ListInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	background-color: #f7e5e2;
	text-align: left;

	h1 {
		width: 100%;
		margin: 0;
		padding: 0;
		border-bottom: 1px solid #588061;
		background-color: #588061;
	}

	p {
		margin: 0;
		padding: 0;
	}
`;

const AdWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ListDetail = () => {
	const axiosPrivate = useAxiosPrivate();
	const user = useParams().user;
	const id = useParams().listId;
	const navigate = useNavigate();
	const [list, setList] = useState({});
	const stateLocation = useLocation();

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
				<ListInfoWrapper>
					<h1>{list.name}</h1>
					<h2>by: {user}</h2>
					<p>{list.description}</p>
					<p>{list.category}</p>
					<p>{list.location}</p>
				</ListInfoWrapper>

				{/* TODO: plug in the ads baby */}
				<AdWrapper>
					<div>
						<h1>{list.name}</h1>
						<h1>{list.description}</h1>
						<h1>{list.category}</h1>
						<h1>{list.location}</h1>
					</div>
				</AdWrapper>

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
