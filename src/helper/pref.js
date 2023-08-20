// useEffect(() => {
// 	let isMounted = true;
// 	const controller = new AbortController();

// 	const getPref = async () => {
// 		try {
// 			const response = await axiosPrivate.get("/pref", {
// 				signal: controller.signal,
// 			});
// 			isMounted &&
// 				setParams({
// 					location: response.data.pref.location,
// 					category: response.data.pref.category,
// 				});
// 		} catch (err) {
// 			console.error(err);
// 			navigate("/login", { state: { from: location }, replace: true });
// 		}
// 	};
// 	getPref();

// 	return () => {
// 		isMounted = false;
// 		controller.abort();
// 	};
// }, []);
