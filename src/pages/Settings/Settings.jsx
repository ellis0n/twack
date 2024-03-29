import React from "react";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styled from "styled-components";

const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px;
	h1 {
		margin: 1rem 0rem;
		color: #588061;
	}
`;

const Settings = () => {
	const logout = useLogout();
	const navigate = useNavigate();
	const location = useLocation();
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

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
			<LoginWrapper>
				<h1>Settings</h1>
			</LoginWrapper>
			<Footer />
		</>
	);
};

export default Settings;
