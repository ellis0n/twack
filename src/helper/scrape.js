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

export default scrapeAds;
