import React from "react";
import {withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Box, Container, Typography, Grid} from "@material-ui/core";

import StarIcon from "@material-ui/icons/Star";


import styles from "../../../../styles/Product.module.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { StarHalf } from "@material-ui/icons";


const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 15,
		borderRadius: 0,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	bar: {
		borderRadius: 0,
		backgroundColor: theme.palette.warning.main,
	},
}))(LinearProgress);


const c_reviews_data = [
	{
		noofstar: "5",
		percentage: 85,
	},
	{
		noofstar: "4",
		percentage: 50,
	},
	{
		noofstar: "3",
		percentage: 30,
	},
	{
		noofstar: "2",
		percentage: 20,
	},
	{
		noofstar: "1",
		percentage: 10,
	},
];

export default function CustomerReviews(props) {

		const starRating =  Math.floor((Math.random() * (8 - 0 + 1) + 0))
		const reviews =  Math.floor((Math.random() * (10 - 1 + 1) + 1))

	return (
		<Container className={styles.reviews_outer} maxWidth="lg">
			<Grid container>
				<Grid item xs={12}>
					<Box align="center" className={styles.heading_container}>
						<Typography variant="h3">Reviews</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid item xs={12} md={8} align="center">
						<Box>
							<Typography
								variant="body1"
								color="secondary"
								className={styles.review_title}
							>
								{`4.${starRating}`}
							</Typography>
						</Box>

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
							<StarHalf
								color="secondary"
								className={styles.star_icon}
							/>
						</Box>

						<Box mt={2}>
							<Typography
								variant="body1"
								className={styles.review_sub_title}
							>
								{reviews} Reviews
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Grid item xs={12} md={6}>
					{c_reviews_data.map((c_reviews_data, ind) => (
						<Box
							display="flex"
							key={ind}
							alignItems="center"
							mt={2}
						>
							<Box minWidth={100}>
								<Typography variant="h6" color="textSecondary">
									{c_reviews_data.noofstar} STAR{" "}
								</Typography>
							</Box>
							<Box width="100%" mr={2}>
								<BorderLinearProgress
									variant="determinate"
									value={c_reviews_data.percentage}
								/>
							</Box>
							<Box minWidth={60}>
								<Typography variant="h6" color="textSecondary">
									{c_reviews_data.percentage} %
								</Typography>
							</Box>
						</Box>
					))}
				</Grid>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						margin: "2rem 0",
					}}
				>
				</div>
			</Grid>
		</Container>
	);
}
