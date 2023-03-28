import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Banner from "../../components/Banner";
import UserDetail from "../UserDetail/UserDetail";
import Footer from "../../components/Footer";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import AdPage from "../Ads/AdPage";
import jwt_decode from "jwt-decode";

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		margin: 1rem 0rem;
		color: #588061;
	}
`;

const Home = () => {
	const logout = useLogout();
	const navigate = useNavigate();
	const { auth } = useAuth();

	const decode = jwt_decode(auth.accessToken);
	const user = decode.username;

	return (
		<HomeWrapper>
			{console.log(user)}
			<Banner theme="header" />
			<AdPage />
		</HomeWrapper>
	);
};

export default Home;
