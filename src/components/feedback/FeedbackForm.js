import React from "react";
import { useFormik } from "formik";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import request from "../../middlewares/axios/post";

import { SET_TOASTIFY } from "../../store/actionTypes/toastify";
import { useDispatch } from "react-redux";

import { Grid, Typography, TextField, Button } from "@material-ui/core";

import FeedBackPersonal from "./FeedbackPersonal";
import FeedBackQue from "./FeedbackQueue";

import styles from "../../../styles/Feedback.module.css";

function getSteps() {
	return [
		"Personal information ",
		"Overall Experience With Our Service",
		"What should we change in order to live up to your expectations?",
	];
}

export default function Feedback() {
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const dispatch = useDispatch();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const formik = useFormik({
		initialValues: {
			complaintNo: "",
			name: "",
			email: "",
			phone: "",
			ratings: {
				experience: 0,
				customerSupport: 0,
				satisfaction: 0,
				productQuality: 0,
				recommendService: 0,
			},
			message: "",
		},
		onSubmit: async (values) => {
			const response = await request("/forms/feedback", values);
			if (response.status === 200) {
				dispatch({
					type: SET_TOASTIFY,
					payload: {
						open: true,
						msg: "Feedback Submitted!",
						type: "success",
					},
				});
			} else {
				dispatch({
					type: SET_TOASTIFY,
					payload: {
						open: true,
						msg: "Feedback could not be submitted at this moment!",
						type: "error",
					},
				});
			}
		},
	});

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <FeedBackPersonal onChange={formik.handleChange} values={formik.values} />;
			case 1:
				return <FeedBackQue onChange={formik.handleChange} values={formik.values} />;
			case 2:
				return (
					<div>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={4}>
								<TextField
									onChange={formik.handleChange}
									value={formik.values.message}
									id="message"
									label="Message"
									multiline
									rows={5}
									fullWidth
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</div>
				);
			default:
				return "Unknown step";
		}
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent className={styles.stepContent}>
							<Typography>{getStepContent(index)}</Typography>
							<div className={styles.actionsContainer}>
								<div>
									<Button disabled={activeStep === 0} onClick={handleBack} className={styles.backButton}>
										Back
									</Button>
									{activeStep === steps.length ? (
										<Button color="secondary" onClick={handleNext} className={styles.nextButton} type="submit">
											Finish
										</Button>
									) : (
										<Button color="secondary" onClick={handleNext} className={styles.nextButton}>
											Next
										</Button>
									)}
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={styles.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button onClick={handleReset} className={styles.nextButton}>
						Re-Attemp
					</Button>
				</Paper>
			)}
		</form>
	);
}
