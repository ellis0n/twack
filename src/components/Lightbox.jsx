import React, { useState } from "react";
import styled from "styled-components";

const Preview = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 18%;
	background-color: #0000009f;
	border-radius: 8px;
	/* overflow: scroll hidden; */
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	img {
		margin: 0.5rem;
		max-width: 100%;
		max-height: 80%;
		transition: all 0.3s ease-in-out;
		opacity: 70%;
		:hover {
			transform: scale(1.1);
		}
	}
`;

const LightboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000000c5;
	z-index: 1000;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease-in-out;
	/* overflow: scroll hidden; */

	button {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: #000000c5;
		color: #ffffff;
		border: none;
		font-size: 1.5rem;
		padding: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		:hover {
			background-color: #ffffffc5;
			color: #000000;
		}
	}
`;

const CurrentImage = styled.div`
	width: 100%;
	height: 80%;
	background-color: #000000df;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		border: 4px solid rgba(0, 0, 0, 0.171);
		border-radius: 8px;
		max-width: 100%;
		max-height: 100%;
	}
`;

const Lightbox = ({ images }) => {
	const [showLightbox, setShowLightBox] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const handleClick = (e) => {
		e.preventDefault();
		setShowLightBox(!showLightbox);
		console.log(showLightbox);
	};

	return (
		<>
			{showLightbox ? (
				<LightboxWrapper>
					<button
						onClick={(e) => {
							e.preventDefault();
							setShowLightBox(!showLightbox);
							setCurrentImage(0);
						}}
					>
						X
					</button>
					<CurrentImage>
						<img src={images[currentImage]} alt="" />
					</CurrentImage>
					<Preview>
						{images.map((image, i) => {
							return (
								<img
									key={i}
									src={image}
									alt=""
									onClick={(e) => {
										e.preventDefault();
										setCurrentImage(i);
									}}
								/>
							);
						})}
					</Preview>
				</LightboxWrapper>
			) : null}

			<Preview>
				{images.map((image, i) => {
					return (
						<img
							key={i}
							src={image}
							alt=""
							onClick={(e) => {
								handleClick(e);
							}}
						/>
					);
				})}
			</Preview>
		</>
	);
};
export default Lightbox;
