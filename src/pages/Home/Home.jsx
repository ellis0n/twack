import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Banner from "../../components/Banner";
import UserDetail from "../UserDetail/UserDetail";
import Footer from "../../components/Footer";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import AdCard from "../Ads/AdCard";

const HomeWrapper = styled.div`
	h1 {
		color: #588061f6;
	}
`;

const Home = () => {
	const logout = useLogout();
	const navigate = useNavigate();
	const auth = useAuth();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	console.log(auth);

	return (
		<HomeWrapper>
			<Banner theme="header" />

			<h1>Hi, {auth.auth.user}</h1>

			<AdCard />
		</HomeWrapper>
	);
};

export default Home;
