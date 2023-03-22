import React, { useState } from "react";
import styled from "styled-components";

const BlurDiv = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	background-color: ${(props) => (props.isOpen ? "#00000092" : "none")};
	z-index: ${(props) => (props.isOpen ? "1" : "0")};
	backdrop-filter: ${(props) => (props.isOpen ? "blur(.7px)" : "none")};
`;

const withBlurEffect = (WrappedComponent) => {
	return (props) => {
		const [isMenuOpen, setIsMenuOpen] = useState(false);

		return (
			<BlurDiv isOpen={isMenuOpen}>
				<WrappedComponent
					{...props}
					setIsMenuOpen={setIsMenuOpen}
					isMenuOpen={isMenuOpen}
				/>
			</BlurDiv>
		);
	};
};

export default withBlurEffect;
