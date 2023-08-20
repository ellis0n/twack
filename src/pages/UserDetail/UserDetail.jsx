import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import SavedAds from "../SavedAds/SavedAds";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import styled from "styled-components";

const UserCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	background: #588061f6;
`;

const UserDetail = () => {
	const params = useParams();
	const id = params.user;
	console.log(useParams());
	const [user, setUser] = useState(null);
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get(`/users/${id}`, {
					signal: controller.signal,
				});
				console.log(response.data);
				isMounted && setUser(response.data);
			} catch (err) {
				console.error(err);
				navigate("/login", { state: { from: location }, replace: true });
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<Banner theme="header" />
			{user ? (
				<>
					<UserCard>{user.username}</UserCard>
					{/* <h2 className="banner.pref.location}</h2> */}
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</>
	);
};

export default UserDetail;
