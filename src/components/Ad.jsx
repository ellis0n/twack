import React, { useState } from "react";
import Lightbox from "./Lightbox";
import styled from "styled-components";

const AdWrapper = styled.div`
	overflow: hidden;
	border-radius: 1rem;
	height: 90vh;
	max-height: 600px;
	font-family: Arial, Helvetica, sans-serif;
	/* border: 2px solid #588061fd; */
	background-color: #588061f2;

	a {
		color: inherit;
		text-decoration: none;
	}
	h1 {
		color: #282c34;
		border-radius: 12px 12px 0 0;
		background-color: #ffffff;
		font-family: "Fredoka One";
		font-weight: 900;
		font-size: 1rem;
		padding: 1em;
		margin: 0;
		line-height: 1rem;

		overflow: hidden;
		text-overflow: ellipsis;
		:hover {
			color: #282c3498;
		}
	}

	h2 {
		background-color: #5880614a;
		color: #282c34;
		font-family: "Fredoka One";
	}

	p {
		height: 100%;
		padding: 0 1em;
		text-align: left;
		font-size: calc(1em + 0.5vw);
		line-height: 1.5em;
		background-color: #ffffffa0;
		color: #282c34;
		font-family: "Fredoka One";
	}

	a {
		text-decoration: none;
		color: #282c3475;
		font-family: "Fredoka One";
		font-size: 1em;

		:hover {
			color: #282c3498;
		}
	}

	@media (min-width: 768px) {
		width: 90%;
		height: 90vh;
		max-height: 600px;
		margin: 2% auto;
	}
`;

const ImgWrapper = styled.div`
	background-image: url(${(props) => props.src});
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: auto 100%;
	background-color: #ffffff22;

	border: 4px solid rgba(0, 0, 0, 0.171);
	border-radius: 12px;
	height: 60%;

	display: flex;
	justify-content: flex-end;
	flex-direction: column;

	/* width: 100%; */
	/* overflow: hidden scroll; */
	/* object-fit: cover; */
`;

//  The component for rendering each individual ad
const Ad = ({ url, title, alt, src, price, desc, index, images }) => {
	console.log(desc);
	return (
		<AdWrapper>
			<h1>
				<a href={url}>{title}</a>
			</h1>
			<ImgWrapper src={src}>
				<Lightbox images={images} />
			</ImgWrapper>
			<h2>${price}</h2>
			{desc.length > 100 ? (
				<>
					<p>
						{desc.slice(0, desc.length - 3)}...
						<a href={url} className="link">
							{" "}
							(see on Kijiji)
						</a>
					</p>
				</>
			) : (
				<p>{desc}</p>
			)}
		</AdWrapper>
	);
};

export default Ad;
