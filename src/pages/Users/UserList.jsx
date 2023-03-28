import React { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import Banner from "../../components/Banner";
import { axiosPrivate } from "../../api/axios";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 2% 12.5%;
	margin-top: 60px;
`;

const UserList = () => {
	const { user, id } = useParams();
	const navigate = useNavigate();
	const [list, setList] = useState(null);
	
	useEffect(() => {
		console.log(user, id)
		let isMounted = true;
		const controller = new AbortController();

		const getUserList = async () => {
			try {
				const response = await axiosPrivate.get(`/${user}/list/${id}`, {
					signal: controller.signal,
				});
				isMounted && setList(response.data);
			} catch (error) {
				console.error(error);
				// navigate("/", { state: { from: stateLocation }, replace: true });
			}
		};
		getUserList();

		return () => {
			isMounted = false;
			controller.abort();
		}
		
	}, []);


	return (
		<>
			<Banner theme="header" />
			<Wrapper>
				<h1>Users</h1>
			</Wrapper>
		</>
	);
};

export default UserList;
