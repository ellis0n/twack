import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
	background-color: ;
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;

	&:hover {
		background-color: #3e8e41;
	}
`;

const Button = ({ ad, vote, label, handleClick }) => {
	let data = { ad: ad, vote: vote };

	const onClick = async (e) => {
		e.preventDefault();
		handleClick(data);
	};

	return (
		<ButtonWrapper type="button" onClick={onClick}>
			{label}
		</ButtonWrapper>
	);
};

export default Button;
