import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
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
	const [user, setUser] = useState(null);
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getFollowing = async () => {
			try {
				const response = await axiosPrivate.get(`/users/${id}/following`, {
					signal: controller.signal,
				});
				isMounted && setUser(response.data);
				console.log(response.data);
			} catch (err) {
				console.error(err);
				navigate("/login", { state: { from: location }, replace: true });
			}
		};

		getFollowing();
		console.log(user);

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
