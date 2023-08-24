import React, { useState, useEffect, useCallback, useRef, memo } from "react";
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
	margin: 10px;

	/* ::before {
		position: absolute;
		content: "";
		width: 100%;
		height: 100%;
		box-shadow: inset 10px 0 0 20px 588061f2;
	} */

	a {
		text-decoration: none;
		color: inherit;
	}
`;

const ImgWrapper = styled.div`
	position: relative;
	/* padding-bottom: 100%; */
	width: auto;
	/* height: 100%; */
	overflow: hidden;
	background: #f7e5e263;
	overflow-y: hidden;
	overflow-x: hidden;
	aspect-ratio: 1/1;
	display: flex;
	justify-content: center;
	background-color: #f7e5e2;

	img {
		top: 0;
		left: 0;
		height: auto;
		width: 100%;
		object-fit: contain;
		overflow-clip-margin: content-box;
		overflow: clip;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: center;
	//lower opacity on hover prop
	background-color: #588061f2;
	height: auto;
	box-shadow: inset 0px -4px 23px -1px rgba(0, 0, 0, 0.192);

	a {
		color: #f7e5e2;
		font-family: "Inter";
		overflow: hidden;
		text-overflow: ellipsis;

		:hover {
			color: #282c3498;
		}
	}
`;

const PriceWrapper = styled.div`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	justify-content: center;
	width: 120px;
	font-family: "Fredoka One";
	background-color: #588061;
	opacity: ${({ isHovering }) => (isHovering ? "0.1" : "1")};
	position: absolute;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
	border-radius: 0 0 6px 0;

	p {
		color: #f7e5e2;
	}
`;

const DescriptionWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #f7e5e2;
	overflow: hidden;
	min-height: 120px;
	margin-block: 3px;

	p {
		font-family: "Inter";
		font-size: 0.6;
		font-weight: 500;
		margin: 0 2px;
		overflow: hidden;
		text-align: left;
		margin: 0 12px;
	}
`;

const Ad = ({ url, title, alt, src, price, desc, images, date, location }) => {
	const [isHovering, setIsHovering] = useState(false);
	const [imageArray, setImageArray] = useState([src, ...images]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedImage, setSelectedImage] = useState(imageArray[0]);

	useEffect(() => {
		let intervalId;

		if (isHovering) {
			intervalId = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
			}, 600);
		} else {
			setCurrentIndex(0);
		}
		return () => clearInterval(intervalId);
	}, [isHovering, images.length]);

	useEffect(() => {
		setSelectedImage(images[currentIndex]);
	}, [currentIndex, images]);

	const parseTitle = (title) => {
		if (title.length > 25) {
			return title.slice(0, 25) + "...";
		} else {
			return title;
		}
	};

	return (
		<>
			<AdWrapper
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				<ImgWrapper>
					<img src={selectedImage} alt={alt} />
					<PriceWrapper>
						<p>${price}</p>
					</PriceWrapper>
				</ImgWrapper>
				<TitleWrapper isHovering={isHovering}>
					<a href={url} className="title">
						{parseTitle(title)}
					</a>
				</TitleWrapper>
				{desc.length > 100 ? (
					<DescriptionWrapper>
						<p>{desc}</p>
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
