import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
	background-color: inherit;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
`;

const Button = ({ label, handleClick }) => {
	const onClick = async (e) => {
		e.preventDefault();
		handleClick();
	};

	return (
		<ButtonWrapper type="button" onClick={onClick}>
			{label}
		</ButtonWrapper>
	);
};

export default Button;
