import React from "react";
import Slider from "react-slick";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";

import {
	Container,
	Box,
	Typography,
} from "@material-ui/core";

import styles from "../../../../styles/Product.module.css";

const reviews_show_data = [
	{
		noofstar: [
			{
				starname:
					'<StarIcon color="secondary"  className="star_icon"/>',
			},
			{
				starname:
					'<StarIcon color="secondary"  className="star_icon"/>',
			},
			{
				starname:
					'<StarIcon color="secondary"  className="star_icon"/>',
			},
			{
				starname:
					'<StarIcon color="secondary"  className="star_icon"/>',
			},
			{
				starname:
					'<StarIcon color="secondary"  className="star_icon"/>',
			},
		],
		name: "L999 Smartoo",
		desc: "Best combo out there. The mouse is noise-free and built for heavy-duty usage. Keyboard is made for extensive usage and the print won’t fade off easily. They have so many fascinating colour options too which is really impressive. I have used both of them for a while and I am greatly satisfied with the quality and size.",
	},
	{
		noofstar: "ASA",
		name: "E9 Splash resistant Keyboard",
		desc: "It is a great product with Nano receiver and key indicators. It is light weight, the keys are smooth to work with and it is spill resistant. Have used it for over a month and I’m glad to say that this product hasn’t disappointed me at all.",
	},
	{
		noofstar: "DSASA",
		name: "Jolly wireless mouse",
		desc: "Been using this from a while now and I can say that this is a must-use mouse. It is perfect in size as sometimes they can be smaller in size than expected. It isn’t noisy and that’s a win-win and is smooth in usage. The Bluetooth connectivity is great and works efficiently. I will have to say that I’m in awe of this product",
	},
	{
		noofstar: "ASAS",
		name: "Adapter",
		desc: "Compatible with Dell laptops and works for long hours without heating up. I’m writing this review after using it for a few months and so far it has been a great adapter, fulfilling all my laptop’s requirements.",
	},
];

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "#FCC101" }}
			onClick={onClick}
		>
			<NavigateBeforeRoundedIcon />
		</div>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "#FCC101" }}
			onClick={onClick}
		>
			<NavigateNextRoundedIcon />
		</div>
	);
}

const ReviewsShow = () => {
	var settings = {
		dots: false,
		navs: true,
		swipeToSlide: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		nextArrow: <SamplePrevArrow />,
		prevArrow: <SampleNextArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};
	return (
		<Container maxWidth="lg">
			<Typography variant="h4" align="center" gutterBottom>
				Our Products Speak For Themselves
			</Typography>
			
				<Slider {...settings} className={styles.slider_outer}>
					{reviews_show_data.map((reviews_show_data, ind) => (
						<div className={styles.slide_item} p={5} key={ind}>
							<Box className={styles.r_product_box} p={3}>
								<Box>
									<StarIcon
										color="secondary"
										className={styles.star_icon}
									/>
									<StarIcon
										color="secondary"
										className={styles.star_icon}
									/>
									<StarIcon
										color="secondary"
										className={styles.star_icon}
									/>
									<StarIcon
										color="secondary"
										className={styles.star_icon}
									/>
									<StarBorderIcon
										className={styles.star_icon}
									/>
								</Box>

								<Box>
									<Typography
										style={{ margin: "10px auto 15px" }}
										variant="body1"
										className={styles.product_s_pricing}
									>
										{reviews_show_data.desc}
									</Typography>

									<Typography
										variant="h5"
										className={styles.product_s_pricing}
									>
										{reviews_show_data.name}
									</Typography>
								</Box>
							</Box>
						</div>
					))}
				</Slider>
		</Container>
	);
};

export default ReviewsShow;
