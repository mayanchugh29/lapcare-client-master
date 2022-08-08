import React from "react";

import { Button, Box, Typography } from "@material-ui/core";

import styles from "../../../styles/componentStyles/SectionTitleLayout1.module.css";

export default function SectionTitleLayout1(props) {
	if (props.title_class == "center_title_outer") {
		return (
			<Box className={styles.center_title_outer} style={{ padding: "3rem 1rem .2rem 1rem" }}>
				<Typography variant="h2" align="center" className={styles.center_title_inn}>
					{props.title_text}
				</Typography>
			</Box>
		);
	} else if (props.title_class == "left_subtitle_outer") {
		return (
			<Box className={styles.left_subtitle_outer}>
				<Typography variant="h3" className={styles.left_subtitle_inn}>
					{props.title_text}
				</Typography>
			</Box>
		);
	} else {
		return (
			<Box className={styles.title_outer}>
				<Typography variant="h2" align="center" className={styles.title_inn}>
					{props.title_text}
				</Typography>
			</Box>
		);
	}
}
