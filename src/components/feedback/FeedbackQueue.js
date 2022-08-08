import React from "react";
import { Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@material-ui/core";

import styles from "../../../styles/Feedback.module.css";

const options = [
	{
		value: "1",
		label: "Excellent",
	},
	{
		value: "2",
		label: "Good",
	},
	{
		value: "3",
		label: "Average",
	},
	{
		value: "4",
		label: "Poor",
	},
];

export default function FeedBackQue(props) {
	return (
		<div className={styles.formContainer}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<div className={styles.radioGroupContainer}>
						<FormControl component="fieldset">
							<FormLabel className={styles.formQuestion}>
								How would you rate your overall experience with our service?
							</FormLabel>
							<RadioGroup
								row
								aria-label="position"
								name="ratings.experience"
								value={props.values.ratings.experience}
								onChange={props.onChange}
							>
								{options.map((option) => {
									return (
										<FormControlLabel
											className={styles.radioButton}
											key={option.value}
											value={option.value}
											control={<Radio color="primary" />}
											label={option.label}
											labelPlacement="end"
										/>
									);
								})}
							</RadioGroup>
						</FormControl>
						<FormControl component="fieldset">
							<FormLabel className={styles.formQuestion}>
								How satisfied are you with the customer support officer?
							</FormLabel>
							<RadioGroup
								row
								aria-label="position"
								name="ratings.customerSupport"
								value={props.values.ratings.customerSupport}
								onChange={props.onChange}
							>
								{options.map((option) => {
									return (
										<FormControlLabel
											className={styles.radioButton}
											key={option.value}
											value={option.value}
											control={<Radio color="primary" ty />}
											label={option.label}
											labelPlacement="end"
										/>
									);
								})}
							</RadioGroup>
						</FormControl>
						<FormControl component="fieldset">
							<FormLabel className={styles.formQuestion}>
								How satisfied are you with the timeliness of service?
							</FormLabel>
							<RadioGroup
								row
								aria-label="position"
								name="ratings.satisfaction"
								value={props.values.ratings.satisfaction}
								onChange={props.onChange}
							>
								{options.map((option) => {
									return (
										<FormControlLabel
											className={styles.radioButton}
											key={option.value}
											value={option.value}
											control={<Radio color="primary" />}
											label={option.label}
											labelPlacement="end"
										/>
									);
								})}
							</RadioGroup>
						</FormControl>
						<FormControl component="fieldset">
							<FormLabel className={styles.formQuestion}>How would you rate our product quality?</FormLabel>
							<RadioGroup
								row
								aria-label="position"
								name="ratings.productQuality"
								value={props.values.ratings.productQuality}
								onChange={props.onChange}
							>
								{options.map((option) => {
									return (
										<FormControlLabel
											className={styles.radioButton}
											key={option.value}
											value={option.value}
											control={<Radio color="primary" />}
											label={option.label}
											labelPlacement="end"
										/>
									);
								})}
							</RadioGroup>
						</FormControl>
						<FormControl component="fieldset">
							<FormLabel className={styles.formQuestion}>
								Would you recommend our product or service to other people?
							</FormLabel>
							<RadioGroup
								row
								aria-label="position"
								name="ratings.recommendService"
								value={props.values.ratings.recommendService}
								onChange={props.onChange}
							>
								{options.map((option) => {
									return (
										<FormControlLabel
											className={styles.radioButton}
											key={option.value}
											value={option.value}
											control={<Radio color="primary" />}
											label={option.label}
											labelPlacement="end"
										/>
									);
								})}
							</RadioGroup>
						</FormControl>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
