import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Banner from "../../components/Banner";
import UserDetail from "../UserDetail/UserDetail";
import Footer from "../../components/Footer";
import styled from "styled-components";

const HomeWrapper = styled.div`
	h1 {
		color: #588061f6;
	}
`;

const Home = () => {
	const logout = useLogout();
	const navigate = useNavigate();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<HomeWrapper>
			<Banner theme="header" />

			<h1>Placeholder</h1>

			<div>
				<button className="login-btn" onClick={signOut}>
					Sign Out
				</button>
			</div>
			<Footer />
		</HomeWrapper>
	);
};

export default Home;
