import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/Button";

const Lists = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const stateLocation = useLocation();

	const [lists, setLists] = useState([]);
	const [showCreateList, setShowCreateList] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getLists = async () => {
			try {
				const response = await axiosPrivate.get("/lists", {
					signal: controller.signal,
				});
				isMounted && setLists(response.data.lists);
			} catch (err) {
				console.error(err);
				// navigate("/login", { state: { from: stateLocation }, replace: true });
			}
		};
		getLists();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<Banner theme="header" />
			<div>
				<h1>Lists</h1>
				<Button
					ad=""
					vote=""
					label="Create a list"
					handleClick={() => setShowCreateList(true)}
				/>
				{lists.length === 0 ? (
					<>
						<p>No lists found</p>
					</>
				) : (
					lists.map((list, i) => (
						<div key={i}>
							<h2>{list.name}</h2>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Lists;
