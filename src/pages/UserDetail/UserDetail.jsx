import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import SavedAds from "../SavedAds/SavedAds";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";

const UserDetail = () => {
	let { id } = useParams();
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
			<Banner className="banner-sm" />
			<Navbar />
			{user ? (
				<>
					<div className="banner">{user.username}</div>
					{/* <h2 className="banner.pref.location}</h2> */}
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</>
	);
};

export default UserDetail;
