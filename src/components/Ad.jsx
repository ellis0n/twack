import React, { useState } from "react";
import Lightbox from "./Lightbox";
import styled from "styled-components";

const AdWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 1rem;
	height: 100%;
	max-height: 90%;
	font-family: Arial, Helvetica, sans-serif;
	border: 2px solid #282c34;
	height: 90vh;
	max-height: 70vh;
	max-width: 600px;
	margin: 2% auto;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);

	a {
		text-decoration: none;
		color: inherit;
	}

	p {
		height: auto;
		padding: 0 1em;
		/* text-align: left; */
		font-size: calc(1em + 0.5vw);
		line-height: 1.5em;
		color: #282c34;
		font-family: "Fredoka One";
	}
`;

const ImgWrapper = styled.div`
	background-image: url(${(props) => props.src});
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100%;
	background-color: #ffffff22;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	align-items: flex-end;
`;

const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: #588061f2;

	a {
		font-size: 2rem;
		color: #f7e5e2;
		border-radius: 12px 12px 0 0;
		font-family: "Fredoka One";
		font-weight: 900;
		margin: 0;
		line-height: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		:hover {
			color: #282c3498;
		}
	}
`;

const InfoWrapper = styled.div`
	display: flex;
	position: relative;
	opacity: 95%;
	flex-direction: column;
	width: 33%;
	border-radius: 12px 12px 0px 0px;
	font-family: "Fredoka One";
	margin-right: 0.5em;

	.info {
		color: #282c34;
		font-family: "Fredoka One";
		font-size: 0.8rem;
		margin: 0;
		padding: 0.5em;
		text-align: left;
		background-color: #f7e5e2;
	}

	.price {
		font-weight: 900;
		background-color: #588061f4;
		color: #f7e5e2;
		border-radius: 12px 12px 0px 0px;

		h2 {
			margin: 0;
			font-size: 3rem;
			text-align: center;
		}
	}
`;

const DescriptionWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 90%;
	width: 100%;
	height: 33%;
	background-color: #f7e5e2;
	overflow: hidden;
	/* height: 20%; */
	p {
		font-size: rem;
		color: #282c34;
		font-family: "Fredoka One";
		font-weight: 900;
		margin: 0;
		line-height: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const Ad = ({
	url,
	title,
	alt,
	src,
	price,
	desc,
	index,
	images,
	date,
	location,
}) => {
	const highRes = (str) => {
		return str.replace(/200-jpg/g, "1200-jpg");
	};

	return (
		<AdWrapper>
			<TitleWrapper>
				<h1>
					<a href={url} className="title">
						{title}
					</a>
				</h1>
			</TitleWrapper>
			<ImgWrapper src={highRes(src)}>
				<InfoWrapper>
					<div className="price">
						<h2>${price}</h2>
					</div>
					<h2 className="info">{location}</h2>
					<h2 className="info">{date}</h2>
				</InfoWrapper>
				<Lightbox images={images} alt={alt} />
			</ImgWrapper>
			{desc.length > 100 ? (
				<DescriptionWrapper>
					<p>
						{desc.slice(0, desc.length - 3)}...
						<a href={url} className="link">
							{" "}
							(see on Kijiji)
						</a>
					</p>
				</DescriptionWrapper>
			) : (
				<DescriptionWrapper>
					<p>{desc}</p>
				</DescriptionWrapper>
			)}
		</AdWrapper>
	);
};

export default Ad;
