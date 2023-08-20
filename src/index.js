import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<HashRouter>
		{/* <BrowserRouter> */}
		<AuthProvider>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</AuthProvider>
		{/* </BrowserRouter> */}
	</HashRouter>
	//</React.StrictMode>
);
reportWebVitals();
