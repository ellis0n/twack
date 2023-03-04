import React, { useEffect, useState } from "react";
import ParamBox from "../../components/ParamBox";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import Users from "../Users/Users";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Wrapper from "../../components/Wrapper";

const Settings = () => {
	const logout = useLogout();
	const navigate = useNavigate();
	const location = useLocation();
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	// const [pref, setPref] = useState([]);

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	const handleClick = async (pref) => {
		try {
			const response = await axiosPrivate.put(
				"/pref",
				JSON.stringify({ pref, user: auth.user }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Banner theme="header" />
			<Navbar />
			<Wrapper>
				<ParamBox
					type="setting"
					text="Save preferences."
					handleClick={handleClick}
				/>
				<div>
					<button className="login-btn" onClick={signOut}>
						Sign Out
					</button>
				</div>
				<Footer />
			</Wrapper>
		</>
	);
};

export default Settings;
