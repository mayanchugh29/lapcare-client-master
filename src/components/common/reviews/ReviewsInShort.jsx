import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Box, Container, Typography, Grid } from "@material-ui/core";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import CustomButton from "./../cButtons/CustomButton";

import styles from "../../../../styles/Product.module.css";
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

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});



export default function CustomerReviews(props) {
	const classes = useStyles();

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-start",
				flex: 1,
				margin: "0.5rem 0",
				alignItems: "center",
			}}
		>
			<StarIcon color="secondary" className={styles.star_icon} />
			<StarIcon color="secondary" className={styles.star_icon} />
			<StarIcon color="secondary" className={styles.star_icon} />
			<StarIcon color="secondary" className={styles.star_icon} />
			<StarHalf color="secondary" className={styles.star_icon} />
			<Typography
				variant="body1"
				style={{ marginLeft: "12px" }}
				className={styles.review_sub_title}
			>
				{props.reviews.length} Reviews
			</Typography>
		</div>
	);
}
