import React from "react";
import styled from "styled-components";

// Styled Components
const AboutWrapper = styled.div`
	h1 {
		color: #588061f6;
	}
`;

// About Component
const About = () => {
	return (
		<AboutWrapper>
			<h1>About</h1>
			<p>I made this as a personal project</p>
			<p>Yadda yadda</p>
		</AboutWrapper>
	);
};

export default About;
