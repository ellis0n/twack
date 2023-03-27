import { Outlet } from "react-router-dom";
import { React, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Banner from "./Banner";
import styled from "styled-components";

const LoadingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	margin-top: 60px;
`;

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth, persist } = useAuth();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		console.log(`persist isLoading: ${isLoading}`);
		console.log(`persist accessToken: ${auth?.accessToken}`);
	}, [isLoading]);

	console.log(persist);
	return (
		<LoadingWrapper>
			{!persist ? (
				<Outlet />
			) : isLoading ? (
				<>
					<Banner />
					<p>Loading...</p>
				</>
			) : (
				<Outlet />
			)}
		</LoadingWrapper>
	);
};

export default PersistLogin;
