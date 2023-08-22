import { Outlet } from "react-router-dom";
import { React, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

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

	// Uncomment to view auth changes:

	// useEffect(() => {
	// 	console.log(`persist isLoading: ${isLoading}`);
	// 	console.log(`persist accessToken: ${auth?.accessToken}`);
	// }, [isLoading]);

	return (
		<>
			{!persist ? (
				<Outlet />
			) : isLoading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistLogin;
