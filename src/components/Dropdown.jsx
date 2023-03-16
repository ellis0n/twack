import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDropdown = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;

	label {
		font-weight: 200;
		color: #f7e5e2;

		border-bottom: 2px solid #f7e5e2;
	}

	overflow: hidden;
	select {
		width: 100%;
		height: 2rem;
		border-radius: 4px;
		border: 2px solid #f7e5e2;
		text-align: center;
		margin: 0.5rem 0rem;
	}
	option {
		text-align: left;
		overflow: hidden;
	}
`;

const Dropdown = ({ label, options }) => {
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
