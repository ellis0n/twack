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

export default { scrapeAds, sendVote };
