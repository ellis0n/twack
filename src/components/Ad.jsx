import React, { useState } from "react";
import styled from "styled-components";

const AdWrapper = styled.div`
	overflow: hidden;
	border-radius: 1rem;
	height: 90vh;
	max-height: 600px;
	font-family: Arial, Helvetica, sans-serif;
	border: 2px solid #588061fd;
	background-color: #588061f2;

	a {
		color: inherit;
		text-decoration: none;
		h1 {
			color: #282c34;
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
	}

	h2 {
		background-color: #5880614a;
		color: #282c34;
		font-family: "Fredoka One";
	}

	p {
		padding: 0 1em;
		text-align: left;
		font-size: 1em;

		background-color: #fff;
		color: #282c34;
		font-family: "Fredoka One";
	}

	a {
		text-decoration: none;
		color: #282c34;
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
	/* background-image: url(${(props) => props.src}); */
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: auto 100%;

	border: 4px solid rgba(0, 0, 0, 0.171);
	border-radius: 12px;
	height: 60%;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	/* width: 100%; */
	/* overflow: hidden scroll; */
	/* object-fit: cover; */
`;

const Lightbox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 1000;
`;

const ImagePreview = styled.div`
	display: flex;
	flex-direction: row;
	align-items: end;
	justify-content: center;
	/* overflow: hidden; */
	width: 100%;
	background-color: black;
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		padding: 0.5rem;
	}
`;

//  The component for rendering each individual ad
const Ad = ({ url, title, alt, src, price, desc, index, images }) => {
	return (
		<AdWrapper>
			<ImgWrapper src={src}>
				<a href={url}>
					<h1>{title}</h1>
				</a>
				<ImagePreview>
					{images.map((image, i) => {
						return <img key={i} src={image} alt={alt} />;
					})}
				</ImagePreview>
			</ImgWrapper>
			<h2>${price}</h2>
			{desc.length > 100 ? (
				<>
					<p>
						{desc.slice(0, desc.length - 3)}...<a href={url}> (see more)</a>
					</p>
				</>
			) : (
				<p>{desc}</p>
			)}
		</AdWrapper>
	);
};

export default Ad;
