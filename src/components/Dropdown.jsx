import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDropdown = styled.div`
	select {
		height: 2rem;
		border-radius: 4px;
		border: 2px solid #f7e5e2;
		text-align: center;
		margin: 0.5rem 0rem;
	}
	option {
		text-align: center;
		overflow: hidden;
	}
`;

const Dropdown = ({ label, options, handleChange }) => {
	const [selected, setSelected] = useState({
		key: "",
		value: "",
	});

	const handleOptionChange = () => {
		handleChange(selected);
		console.log(selected);
	};

	return (
		<StyledDropdown>
			<label>{label}:</label>
			<select
				multiple={false}
				id={label}
				name={label}
				onChange={(e) => {
					setSelected(e.target.value);
					handleOptionChange();
				}}
			>
				{options.map((option, i) => {
					return (
						<option value={option} key={i}>
							{option.key}
						</option>
					);
				})}
			</select>
		</StyledDropdown>
	);
};

export default Dropdown;
