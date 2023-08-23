import React from "react";
import Lightbox from "./Lightbox";
import styled from "styled-components";

const AdWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	max-height: 90%;
	font-family: Arial, Helvetica, sans-serif;
	max-height: 70vh;
	max-width: 280px;
	min-width: 180px;
	height: auto;
	padding: 4px;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);

	a {
		text-decoration: none;
		color: inherit;
	}
`;

const ImgWrapper = styled.div`
	background-color: #ffffff22;
	height: 0;
	overflow: hidden;
	padding-bottom: 100%;
	position: relative;
	display: flex;
	flex-direction: column-reverse;

	img {
		overflow-clip-margin: content-box;
		max-width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #588061f2;

	h1 {
		margin: 0;
	}

	a {
		font-size: 0.9rem;
		color: #f7e5e2;
		border-radius: 12px 12px 0 0;
		font-family: "Fredoka One";
		margin: 0;
		line-height: 1rem;
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
		text-align: left;
		background-color: #f7e5e2;
	}

	.price {
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
	background-color: #f7e5e2;
	overflow: hidden;
	p {
		font-size: 0.9rem;
		color: #282c34;
		font-family: "Fredoka One";
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const Ad = ({ url, title, alt, src, price, desc, images, date, location }) => {
	const highRes = (str) => {
		return str.replace(/200-jpg/g, "1200-jpg");
	};

	return (
		<>
			<AdWrapper>
				<ImgWrapper>
					<img src={src} alt={alt}></img>
					<InfoWrapper>
						<div className="price">
							<h2>${price}</h2>
						</div>
					</InfoWrapper>
				</ImgWrapper>
				{/* <Lightbox images={images} alt={alt} /> */}
				<TitleWrapper>
					<a href={url} className="title">
						{title}
					</a>
				</TitleWrapper>
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
		</>
	);
};

export default Ad;
