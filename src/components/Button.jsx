import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonWrapper = styled.button`
	display: flex;
	justify-content: center;
	background-color: inherit;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	z-index: 20;
`;

const Button = (props) => {
	const onClick = async (e) => {
		e.preventDefault();

		props.data ? props.handleClick(props.data) : props.handleClick();
	};

	return (
		<ButtonWrapper type="button" onClick={onClick}>
			{props.label ? (
				props.label
			) : (
				<FontAwesomeIcon icon={props.icon} size={props.size} />
			)}
		</ButtonWrapper>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.object,
	size: PropTypes.string,
};

export default Button;
