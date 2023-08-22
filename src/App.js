import "./App.css";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users/Users";
import Layout from "./components/Layout";
import User from "./pages/UserDetail/UserDetail";
import Lists from "./pages/Lists/Lists";
import About from "./pages/About/About";
import ListDetail from "./pages/Lists/ListDetail";
import Landing from "./pages/Landing/Landing";

function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Landing />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />

			<Route path="/" element={<Layout />}>
				{/* Persist Login */}
				<Route element={<PersistLogin />}>
					{/* Private Routes */}
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/about" element={<About />} />
						<Route path="/users" element={<Users />} />
						<Route path="/:user" element={<User />} />
						<Route path="/:user/lists/" element={<Lists />} />
						<Route path="/:user/lists/:listId" element={<ListDetail />} />
					</Route>
				</Route>
				{/* 404 */}
				<Route path="*" element={<h1>404</h1>} />
			</Route>
		</Routes>
	);
}
export default App;
