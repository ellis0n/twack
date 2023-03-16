import React from "react";
import { useState, useEffect } from "react";
import Ad from "../../components/Ad";
import Footer from "../../components/Footer.jsx";
import ParamBox from "../../components/ParamBox";
import VoteButton from "../../components/Button";
import Wrapper from "../../components/Wrapper";
import Banner from "../../components/Banner";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import { scrapeAds, sendVote } from "../../helper/scrape";

const Ads = () => {
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

	return (
		<>
			<Banner theme="header" />
			<Wrapper>
				{/* <ParamBox type="scraper" text={"Get Ads."} handleClick={scrapeAds} /> */}

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
							<div key={index}>
								<Ad
									id={ad.id}
									url={ad.url}
									title={ad.title}
									alt={ad.desc}
									src={ad.img}
									price={ad.price}
									desc={ad.desc}
									index={index}
									images={ad.images}
									date={ad.date}
									location={ad.location}
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
			</Wrapper>
			{/* <Footer /> */}
		</>
	);
};

export default Ads;
