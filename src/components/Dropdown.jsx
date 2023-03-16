import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDropdown = styled.div`
	z-index: 1;
	select {
		font-size: 1rem;
		border-radius: 12px;
		font-family: "Fredoka One";
		/* display: flex; */
		padding: 0;
		/* flex-direction: ; */
		/* height: auto; */
	}

	option {
		font-size: 1rem;
		border-radius: 12px;
		font-family: "Fredoka One";
		width: auto;
	}

	label {
		font-size: 1rem;
		/* margin-right: 1rem; */
		text-align: left;
	}
`;

const Dropdown = ({ label, options }) => {
	console.log({ options });
	return (
		<StyledDropdown>
			<label>{label}:</label>
			<select
				multiple={false}
				id="location"
				// onChange={handleLocation}
				// value={params.location}
			>
				{options.map((option) => {
					return <option value={option.value}>{option.key}</option>;
				})}
			</select>
		</StyledDropdown>
	);
};

export default Dropdown;
