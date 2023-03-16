import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Searchbar = ({ params }) => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();

	const locations = [
		{ key: "Newfoundland and Labrador", value: 9008 },
		{ key: "Nova Scotia", value: 9002 },
		{ key: "British Columbia", value: 9007 },
		{ key: "Alberta", value: 9003 },
		{ key: "Ontario", value: 9004 },
		{ key: "Prince Edward Island", value: 9011 },
		{ key: "Quebec", value: 9001 },
		{ key: "Territories", value: 9010 },
		{ key: "Manitoba", value: 9005 },
	];

	const categories = [
		{ key: "All", value: 0 },
		{ key: "Arts & Collectibles", value: 12 },
		{ key: "Audio Equipment", value: 767 },
		{ key: "Baby & Family", value: 253 },
		{ key: "Bikes", value: 644 },
		{ key: "Books", value: 109 },
		{ key: "Business & Industrial", value: 29659003 },
		{ key: "Cameras", value: 103 },
		{ key: "CDs, DVDs & Blu-Ray", value: 104 },
		{ key: "Clothing", value: 274 },
		{ key: "Computers", value: 16 },
		{ key: "Computer Accessories", value: 128 },
		{ key: "Free Stuff", value: 17220001 },
		{ key: "Furniture", value: 235 },
		{ key: "Garage Sales", value: 638 },
		{ key: "Health & Special Needs", value: 140 },
		{ key: "Hobbies & Crafts", value: 139 },
		{ key: "Home Appliances", value: 105 },
		{ key: "Home Decor", value: 106 },
		{ key: "Home - Outdoor & Garden", value: 107 },
		{ key: "Jewellery & Watches", value: 108 },
		{ key: "Musical Instruments", value: 110 },
		{ key: "Office Furniture & Equipment", value: 111 },
		{ key: "Pets", value: 112 },
		{ key: "Sports Equipment & Recreation", value: 113 },
		{ key: "Tickets", value: 114 },
		{ key: "Toys & Games", value: 115 },
		{ key: "Video Games & Consoles", value: 116 },
		{ key: "Other", value: 117 },
	];

	return (
		<SearchBarWrapper>
			<Dropdown label="Location" options={locations} />
			<Dropdown label="Category" options={categories} />
		</SearchBarWrapper>
	);
};

export default Searchbar;
