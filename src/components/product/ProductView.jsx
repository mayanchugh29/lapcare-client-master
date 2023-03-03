import React from "react";
import Slider from "react-slick";
import ImageMagnify from 'react-image-magnify';
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import Image  from "next/image";
import styles from "../../../styles/Product.module.css";

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				background: "#FCC101",
			}}
			onClick={onClick}
		>
			<NavigateBeforeRoundedIcon />
		</div>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style, display: "block", background: "#FCC101" }} onClick={onClick}>
			<NavigateNextRoundedIcon />
		</div>
	);
}

const ProductView = (props) => {
	var settings = {
		customPaging: function (i) {
			return (
				<a>
					<img src={props.images[i]} />
				</a>
			);
		},
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dotsClass: styles.thumbnail,
		nextArrow: <SamplePrevArrow />,
		prevArrow: <SampleNextArrow />,
	};
	return (
		<Slider {...settings} className={styles.product_page_slider}>
			{props.images.map((image, i) => (
				<div key={i}>
					
					<ImageMagnify
    {...{
      smallImage: {
        src: props.images[i],
        alt: 'Image 1',
        isFluidWidth: true,
		
      },
      largeImage: {
        src: props.images[i],
        width: 1000,
        height: 1000,
      },
      enlargedImagePosition: 'over',
      hoverDelayInMs: 250,
      hoverOffDelayInMs: 150,
    }}
  />
				</div>
			))}
		</Slider>
	);
};

export default ProductView;