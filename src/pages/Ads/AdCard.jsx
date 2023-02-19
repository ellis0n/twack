import React from "react";
import { useState, useEffect } from "react";
import Ads from "../../components/Ads";
import Footer from "../../components/Footer.jsx";
import ParamBox from "../../components/ParamBox";
import VoteButton from "../../components/VoteButton";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

//  Card for holding each individual ad and its child voting options
//  TODO:: Add a comment box component
const AdCard = () => {
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

		const getPref = async () => {
			try {
				const response = await axiosPrivate.get("/pref", {
					signal: controller.signal,
				});
				isMounted &&
					scrapeAds({
						location: response.data.pref.location,
						category: response.data.pref.category,
					});
			} catch (err) {
				console.error(err);
				navigate("/login", { state: { from: stateLocation }, replace: true });
			}
		};
		getPref();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);
	//  Request handler for scraping ads

	const scrapeAds = async (params) => {
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

	const sendVote = async (vote) => {
		let user = auth.user;
		try {
			const response = await axiosPrivate.post(
				"/vote",
				JSON.stringify({ vote, user }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			setVotes([...votes, vote]);
			setAds(ads.filter((ad) => ad.id !== vote.ad.id));
			if (ads.length === 1) {
				setVotes([]);
				setRunning(false);
			}
			console.log(response);
		} catch (err) {
			console.error(err);
			navigate("/login", { state: { from: stateLocation }, replace: true });
		}
	};

	return (
		<>
			<Banner className="banner-sm" />
			<Navbar />
			<div className="main_wrapper">
				<ParamBox type="scraper" text={"Get Ads."} handleClick={scrapeAds} />

				{running ? (
					(console.log(ads),
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
							<div
								key={index}
								style={{ display: index === 0 ? "block" : "none" }}
							>
								<Ads
									id={ad.id}
									url={ad.url}
									title={ad.title}
									alt={ad.desc}
									src={ad.img}
									price={ad.price}
									desc={ad.desc}
									index={index}
								/>

								<div className="vote_wrapper">
									<VoteButton
										ad={ad}
										vote={true}
										text="Deal"
										handleClick={sendVote}
									/>
									<VoteButton
										ad={ad}
										vote={false}
										text="No Deal"
										handleClick={sendVote}
									/>
								</div>
							</div>
						))
					))
				) : (
					// IF NOT RUNNING
					//TODO Not working as intended
					<div style={{ cursor: "pointer" }}>
						<h2>Loading...</h2>
						<Footer />
					</div>
				)}
			</div>
		</>
	);
};

export default AdCard;
