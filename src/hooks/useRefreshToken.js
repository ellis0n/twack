import useAuth from "./useAuth";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();
	const refresh = async () => {
		const response = await axios.get("/refresh", {
			withCredentials: true,
		});
		setAuth((prev) => {
			// console.log(JSON.stringify(prev));
			// console.log(response.data.accessToken);
			const decoded = jwtDecode(response.data.accessToken);

			const user = decoded ? decoded.username : undefined;
			// console.log(user);

			return {
				...prev,
				user: user,
				accessToken: response.data.accessToken,
			};
		});
		return response.data.accessToken;
	};
	return refresh;
};
export default useRefreshToken;
