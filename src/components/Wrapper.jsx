import React from "react";
import Banner from "./Banner";
import styled from "styled-components";

const WrapperDiv = styled.div`
	margin: auto 8%;
	bottom: -1%;
`;

const Wrapper = ({ children }) => {
	return <WrapperDiv>{children}</WrapperDiv>;
};

export default Wrapper;
