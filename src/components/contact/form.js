import React from "react";
import styles from "../../../styles/Contact.module.css";
import { Container, Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useFormik } from "formik";
import request from "../../middlewares/axios/post";
import { useDispatch } from "react-redux";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";
import { useRouter } from "next/router";
import { validationSchemaforContactUs } from "../../helpers/yup/contact";
export default function ContactUsFrm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			contact: "",
			city: "",
			state: "",
			country: "",
			message: "",
		},
		validationSchema: validationSchemaforContactUs,
		onSubmit: async (values) => {
			const response = await request("/forms/contactUs", values);
			if (response.status === 200) {
				dispatch({
					type: SET_TOASTIFY,
					payload: {
						open: true,
						type: "success",
						msg: "We will reach back to you soon!",
					},
				});
			} else {
				dispatch({
					type: SET_TOASTIFY,
					payload: {
						open: true,
						type: "error",
						msg: response.data,
					},
				});
			}
			formik.resetForm();
		},
	});
	return (
		<>
			<Container maxWidth="lg" className={styles.form_parent_container}>
				<Box align="center" className="pb_30">
					<Typography variant="h2" className="main_title" gutterBottom style={{ marginBottom: "20px" }}>
						Contact Us
					</Typography>
				</Box>
				<Grid container spacing={3} className={styles.form_outer}>
					<Grid item xs={12} md={6}>
						<form onSubmit={formik.handleSubmit}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										name="name"
										onChange={formik.handleChange}
										label="Name"
										spellCheck="false"
										fullWidth
										value={formik.values.name}
										error={Boolean(formik.touched.name && formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										type="email"
										name="email"
										spellCheck="false"
										onChange={formik.handleChange}
										label="Email"
										fullWidth
										value={formik.values.email}
										error={Boolean(formik.touched.email && formik.errors.email)}
										helperText={formik.touched.email && formik.errors.email}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										type="tel"
										name="contact"
										spellCheck="false"
										onChange={formik.handleChange}
										label="Phone"
										fullWidth
										autoComplete="false"
										value={formik.values.contact}
										error={Boolean(formik.touched.contact && formik.errors.contact)}
										helperText={formik.touched.contact && formik.errors.contact}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										name="city"
										spellCheck="false"
										onChange={formik.handleChange}
										label="City"
										fullWidth
										value={formik.values.city}
										error={Boolean(formik.touched.city && formik.errors.city)}
										helperText={formik.touched.city && formik.errors.city}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										name="state"
										onChange={formik.handleChange}
										label="State"
										spellCheck="false"
										fullWidth
										autoComplete="state"
										value={formik.values.state}
										error={Boolean(formik.touched.state && formik.errors.state)}
										helperText={formik.touched.state && formik.errors.state}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										name="country"
										onChange={formik.handleChange}
										label="Country"
										spellCheck="false"
										fullWidth
										value={formik.values.country}
										error={Boolean(formik.touched.country && formik.errors.country)}
										helperText={formik.touched.country && formik.errors.country}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										label="Message"
										variant="outlined"
										name="message"
										spellCheck="false"
										onChange={formik.handleChange}
										multiline
										rows={4}
										fullWidth
										value={formik.values.message}
										error={Boolean(formik.touched.message && formik.errors.message)}
										helperText={formik.touched.message && formik.errors.message}
									/>
								</Grid>

								<Grid item xs={12}>
									<Button variant="contained" type="submit" color="primary">
										Submit <NavigateNextIcon className="c_btn2_icon" />
									</Button>
								</Grid>
							</Grid>
						</form>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box className="map_outer">
							<iframe
								loading="lazy"
								src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d112150.69565450508!2d77.1830827328694!3d28.54845802864837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390ce3c56dd06489%3A0xfa2beae24dab0b57!2sLapcare+India%2C+601%2C+Bhandari+House%2C+91%2C+Nehru+Place+Market+Road%2C+Nehru+Place%2C+New+Delhi%2C+Delhi+110019!3m2!1d28.548475999999997!2d77.253123!5e0!3m2!1sen!2sin!4v1477375839625"
								width="100%"
								height="350"
								style={{ border: "0px", pointerEvents: "none" }}
							></iframe>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
