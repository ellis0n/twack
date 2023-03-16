import React from "react";
import styled from "styled-components";

//  This is so busted and probably not how I will actually implement
const FooterDiv = styled.div`
	position: fixed;
	bottom: 0;
	z-index: -1;
	width: 100%;
	height: 300px;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	opacity: 0.3;
	overflow: hidden;

	/* background-color: #000000; */
	background-image: url(${process.env.PUBLIC_URL + "/background.png"});
	transition: all 0.3s ease-in-out;

	@media screen and (max-width: 1440px) {
		height: 250px;
	}

	@media screen and (max-width: 1024px) {
		height: 200px;
	}

	@media screen and (max-width: 768px) {
		height: 150px;
	}

	@media screen and (max-width: 280px) {
		/* height: 100px; */
	}
`;

const Footer = () => {
	return <FooterDiv></FooterDiv>;
};

export default Footer;
