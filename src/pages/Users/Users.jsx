import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

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
			<Banner className="banner-sm" />
			<Navbar />
			<article>
				<h2 className="banner">Users</h2>
				{users?.length ? (
					<div className="users-list">
						<ul>
							{users.map((user, i) => (
								<li key={i}>
									<Link className="navLink" to={user.username}>
										{user.username}
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : (
					<p>No users to display</p>
				)}
			</article>
		</>
	);
};

export default Users;
