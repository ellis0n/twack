import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Banner from "../../components/Banner";
import UserDetail from "../UserDetail/UserDetail";
import Footer from "../../components/Footer";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import AdCard from "../Ads/AdCard";

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px;
	h1 {
		margin: 1rem 0rem;
		color: #588061;
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

	return (
		<HomeWrapper>
			<Banner theme="header" />
			<AdCard />
		</HomeWrapper>
	);
};

export default Home;
