import React from "react";
import { useState, useEffect } from "react";
import Ad from "./Ad";
import Footer from "./Footer.jsx";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const AdWrapper = styled.div`
	position: relative;
	margin-top: 120px;
	margin: auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Ads = ({ listInfo, onRefresh, optimisticUpdate }) => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const stateLocation = useLocation();
	const { auth } = useAuth();

	const [ads, setAds] = useState([]);
	const [disabled, setDisabled] = useState(false);

	const [running, setRunning] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getAds = async (listInfo) => {
			const params = {
				location: listInfo.location,
				category: listInfo.category,
				listId: listInfo._id,
			};
			try {
				const response = await axiosPrivate.post(
					"/scrape",
					JSON.stringify({ params, user: auth.user }),
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
				setAds(JSON.parse(response.data));
				setRunning(true);
			} catch (err) {
				console.error(err);
				navigate("/login", { state: { from: stateLocation }, replace: true });
			}
		};
		getAds(listInfo);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handleClick = async (v) => {
		const { vote, ad, listId } = v;

		try {
			setDisabled(true);

			const response = await axiosPrivate.post(
				"/vote",
				JSON.stringify({ vote, ad, listId }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);

			// Remove ad from state after voting
			setAds(ads.filter((a) => a.id !== ad.id));
			optimisticUpdate(ad, vote);
			// onRefresh();

			// If only one ad left, set state to empty
			if (ads.length === 1) {
				setRunning(false);
				onRefresh();
				// On refresh might not be necessary
			}
		} catch (err) {
			console.error(err);
			navigate("/login", { state: { from: stateLocation }, replace: true });
		} finally {
			setDisabled(false);
		}
	};

	return (
		<>
			<AdWrapper>
				{running ? (
					// IF ADS ARRAY STATE EMPTY
					ads.length === 0 ? (
						<div className="ad">
							<h2>No more ads!</h2>
							<h3> Try again later.</h3>
							<Footer />
						</div>
					) : (
						// IF ADS ARRAY STATE NOT EMPTY
						ads.map((ad, index) => (
							<Ad
								key={index}
								ad={ad}
								listId={listInfo._id}
								handleClick={handleClick}
								disabled={disabled}
							/>
						))
					)
				) : (
					// IF NOT RUNNING
					//TODO Not working as intended
					<div style={{ cursor: "pointer" }}>
						<h2>Loading...</h2>
						<Footer />
					</div>
				)}
			</AdWrapper>
		</>
	);
};

export default Ads;
