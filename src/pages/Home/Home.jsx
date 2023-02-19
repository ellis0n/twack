import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import UserDetail from "../UserDetail/UserDetail";
import Footer from "../../components/Footer";

const Home = () => {
	const logout = useLogout();
	const navigate = useNavigate();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<div className="homepage">
			<UserDetail />
			<h3> Homepage</h3>
			<br />
			<Link to="/ads">Go to Ads</Link>
			<br />
			<Link to="/saved">Go to Saved Ads</Link>
			<br />
			<Link to="/settings">Go to Settings</Link>
			<br />
			<Link to="/users">Go to Users</Link>
			<div>
				<button className="login-btn" onClick={signOut}>
					Sign Out
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
