import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Ad from "../../components/Ad";
import Banner from "../../components/Banner";
import Lists from "../../pages/Lists/Lists";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

const AdPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin: 2% 6%;
	margin-top: 60px;

	h1 {
		color: #588061;
	}
`;

const AdPage = () => {
	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();
	const token = jwtDecode(auth.accessToken);
	const [lists, setLists] = useState([]);
	const navigate = useNavigate();
	const { stateLocation } = useLocation();
	const [currentList, setCurrentList] = useState({});

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getLists = async () => {
			try {
				const response = await axiosPrivate.get(
					`/users/${token.username}/lists`,
					{
						signal: controller.signal,
					}
				);
				isMounted && setLists(response.data);
			} catch (err) {
				console.error(err);
				navigate("/", { state: { from: stateLocation }, replace: true });
			}
		};
		getLists();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handleListChange = (list) => {
		console.log(list.key);
		setCurrentList(list);
	};

	return (
		<>
			{console.log(lists)}
			<Banner theme="header" />
			<AdPageWrapper>
				{lists.map((list) => (
					<div>
						<h1>{list.name}</h1>
					</div>
				))}
			</AdPageWrapper>
		</>
	);
};

export default AdPage;
