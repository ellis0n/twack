import React from "react";
import { useState, useEffect } from "react";
import Ad from "../../components/Ad";
import Footer from "../../components/Footer.jsx";
import ParamBox from "../../components/ParamBox";
import VoteButton from "../../components/Button";
import Wrapper from "../../components/Wrapper";
import Banner from "../../components/Banner";
import Searchbar from "../../components/Searchbar";
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

	// Extract from node modules
	const locations = [
		{ key: "Newfoundland and Labrador", value: 9008 },
		{ key: "Nova Scotia", value: 9002 },
		{ key: "British Columbia", value: 9007 },
		{ key: "Alberta", value: 9003 },
		{ key: "Ontario", value: 9004 },
		{ key: "Prince Edward Island", value: 9011 },
		{ key: "Quebec", value: 9001 },
		{ key: "Territories", value: 9010 },
		{ key: "Manitoba", value: 9005 },
	];

	const categories = [
		{ key: "All", value: 0 },
		{ key: "Arts & Collectibles", value: 12 },
		{ key: "Audio Equipment", value: 767 },
		{ key: "Baby & Family", value: 253 },
		{ key: "Bikes", value: 644 },
		{ key: "Books", value: 109 },
		{ key: "Business & Industrial", value: 29659003 },
		{ key: "Cameras", value: 103 },
		{ key: "CDs, DVDs & Blu-Ray", value: 104 },
		{ key: "Clothing", value: 274 },
		{ key: "Computers", value: 16 },
		{ key: "Computer Accessories", value: 128 },
		{ key: "Free Stuff", value: 17220001 },
		{ key: "Furniture", value: 235 },
		{ key: "Garage Sales", value: 638 },
		{ key: "Health & Special Needs", value: 140 },
		{ key: "Hobbies & Crafts", value: 139 },
		{ key: "Home Appliances", value: 105 },
		{ key: "Home Decor", value: 106 },
		{ key: "Home - Outdoor & Garden", value: 107 },
		{ key: "Jewellery & Watches", value: 108 },
		{ key: "Musical Instruments", value: 110 },
		{ key: "Office Furniture & Equipment", value: 111 },
		{ key: "Pets", value: 112 },
		{ key: "Sports Equipment & Recreation", value: 113 },
		{ key: "Tickets", value: 114 },
		{ key: "Toys & Games", value: 115 },
		{ key: "Video Games & Consoles", value: 116 },
		{ key: "Other", value: 117 },
	];

	return (
		<>
			<Wrapper>
				<Searchbar options={locations} />
				{/* <Searchbar options={categories} /> */}
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
							<div
								key={index}
								style={{ display: index === 0 ? "block" : "none" }}
							>
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
					<h2>Loading...</h2>
				)}
			</Wrapper>
			{/* <Footer /> */}
		</>
	);
};

export default AdCard;
