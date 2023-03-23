import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UsersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 12.5%;
	margin-top: 60px;
	h1 {
		margin: 1rem 0rem;
		color: #588061;
	}
`;

const UsersList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	ul,
	li {
		list-style: none;
		color: #588061f6;
		z-index: 0;
	}

	a {
		text-decoration: none;
	}
`;

const Users = () => {
	const [users, setUsers] = useState();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get("/users", {
					signal: controller.signal,
				});
				console.log(response.data);
				isMounted && setUsers(response.data);
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
			<UsersWrapper>
				<h2>Users</h2>
				{users?.length ? (
					<UsersList>
						<ul>
							{users.map((user, i) => (
								<li key={i}>
									<Link className="navLink" to={user.username}>
										<h1>{user.username}</h1>
									</Link>
								</li>
							))}
						</ul>
					</UsersList>
				) : (
					<p>No users found!</p>
				)}
			</UsersWrapper>
		</>
	);
};

export default Users;
