import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2% 6%;
	margin-top: 60px;

	h1 {
		margin: 1rem 0rem;
		color: #588061;
	}
`;

const Home = () => {
	const logout = useLogout();
	const { auth } = useAuth();
	const token = jwt_decode(auth.accessToken);

	return (
		<>
			<Banner />
			<HomeWrapper>
				<h1>hey, {token.username}.</h1>
				<Link to="/ads">
					<button>View Ads</button>
				</Link>
				<Link to="/user">
					<button>View User Details</button>
				</Link>
				<Link to="/twack">
					<button>Twacking</button>
				</Link>
				<button onClick={logout}>Logout</button>
				<Footer />
			</HomeWrapper>
		</>
	);
};

export default Home;
