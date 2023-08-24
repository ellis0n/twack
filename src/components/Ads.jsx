import React from "react";
import { useState, useEffect } from "react";
import Ad from "./Ad";
import Footer from "./Footer.jsx";
import VoteButton from "./Button";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";

const AdWrapper = styled.div`
	margin-top: 120px;
	margin: auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const VoteContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	margin: 0.5rem 0rem;

	button:first-child {
		color: #588061;
		height: 75%;
		background-color: #588061;
	}

	button:nth-child(2) {
		color: #300030;
		height: 25%;
		background-color: #5c020247;
	}
`;

const Ads = ({ listInfo, onRefresh }) => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const stateLocation = useLocation();
	const { auth } = useAuth();

	const [ads, setAds] = useState([]);
	const [votes, setVotes] = useState([]);

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
			console.log(params);
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

	//todo: This needs cleanup:

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
							<>
								<Ad
									key={index}
									id={ad.id}
									url={ad.url}
									title={ad.title}
									alt={ad.desc}
									src={ad.img}
									price={ad.price}
									desc={ad.desc}
									images={ad.images}
									date={ad.date}
									location={ad.location}
								/>
							</>
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
