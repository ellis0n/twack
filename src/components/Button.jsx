import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
	background-color: inherit;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	z-index: 20;
`;

const Button = (props) => {
	console.log(props.data);
	const onClick = async (e) => {
		e.preventDefault();

		props.data ? props.handleClick(props.data) : props.handleClick();
	};

	return (
		<ButtonWrapper type="button" onClick={onClick}>
			{props.label}
		</ButtonWrapper>
	);
};

export default Button;
