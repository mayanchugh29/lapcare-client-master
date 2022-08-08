import React,{useState} from "react";
import styles from "../styles/RegisterProduct.module.css";
import request from "../src/middlewares/axios/post";


//Material Ui Imports
import {
	Container,
	Typography,
	TextField,
	Button,
} from "@material-ui/core";

//Formik imports
import { useFormik } from "formik";
import { validationSchemaForProductRegister } from "../src/helpers/yup/register";

//Redux Imports
import { SET_TOASTIFY } from "../src/store/actionTypes/toastify";
import { useDispatch } from "react-redux";


//Page Components
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import ReCaptchaV2 from 'react-google-recaptcha'


export default function RegisterProduct() {
	const dispatch = useDispatch();
	const [captchaChecked, setcaptchaChecked] = useState(false)

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			contact: "",
			state: "",
			city: "",
			productName: "",
			productCode: "",
			serialNumber: "",
			invoiceNumber: "",
			invoiceDate: "",
			file: [],
			token: ''
		},
		validationSchema: validationSchemaForProductRegister,
		onSubmit: async (values) => {
			if (captchaChecked) {
				const newForm = new FormData();
				newForm.append("name", values.name);
				newForm.append("email", values.email);
				newForm.append("contact", values.contact);
				newForm.append("state", values.state);
				newForm.append("city", values.city);
				newForm.append("productName", values.productName);
				newForm.append("productCode", values.productCode);
				newForm.append("serialNumber", values.serialNumber);
				newForm.append("invoiceNumber", values.invoiceNumber);
				newForm.append("invoiceDate", values.invoiceDate);
				newForm.append("token", values.token)
				newForm.append("file", values.file);
				const response = await request("/forms/register", newForm);
				if (response.status === 200) {
					dispatch({
						type: SET_TOASTIFY,
						payload: {
							open: true,
							type: "success",
							msg: "Product Registration Form Submitted!",
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
			} else {
				dispatch({
					type: SET_TOASTIFY,
					payload: {
						open: true,
						type: "error",
						msg: 'Capatcha verification is required!',
					},
				});
			}

		},
	});


	const handleCaptcha = (value) => {
		formik.setFieldValue("token",value),
		setcaptchaChecked(true)
	}

	return (
		<div>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Product Registration", route: "/register" },
				]}
			/>
			<Container maxWidth="lg">
				<div className={styles.mainContainer}>
					<div className={styles.headingContainer}>
						<Typography style={{ fontSize: "20px", fontWeight: "400" }}>Register Your Product</Typography>
						<Typography variant="body2">Get 1 months's warranty extra</Typography>
					</div>
					<form onSubmit={formik.handleSubmit}>
						<div className={styles.formContainer}>
							<div className={styles.leftContainer}>
								<div className={styles.inputField}>
									<label htmlFor="name">Full Name</label>
									<TextField
										size="small"
										variant="outlined"
										type="text"
										name="name"
										id="name"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.name}
										error={Boolean(formik.touched.name && formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="email">Email</label>
									<TextField
										size="small"
										variant="outlined"
										type="email"
										name="email"
										id="email"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.email}
										error={Boolean(formik.touched.email && formik.errors.email)}
										helperText={formik.touched.email && formik.errors.email}
									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="phone">Phone</label>
									<TextField
										size="small"
										variant="outlined"
										type="tel"
										name="contact"
										id="contact"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.contact}
										error={Boolean(formik.touched.contact && formik.errors.contact)}
										helperText={formik.touched.contact && formik.errors.contact}
									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="city">City</label>
									<TextField
										size="small"
										variant="outlined"
										type="text"
										name="city"
										id="city"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.city}
										error={Boolean(formik.touched.city && formik.errors.city)}
										helperText={formik.touched.city && formik.errors.city}
									/>
								</div>
								<div className={styles.inputField}>
									<ReCaptchaV2 sitekey='6LemAf8cAAAAACO_gvD60WOV2hhk_wVJPVxsEU6s' onChange={handleCaptcha} />
								</div>

							</div>
							<div className={styles.rightContainer}>
								<div className={styles.inputField}>
									<label htmlFor="productName">Product Name</label>
									<TextField
										size="small"
										type="text"
										variant="outlined"
										name="productName"
										id="productName"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.productName}
										error={Boolean(formik.touched.productName && formik.errors.productName)}
										helperText={formik.touched.productName && formik.errors.productName}
									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="productCode">Product Code/Model No.</label>
									<TextField
										size="small"
										type="text"
										variant="outlined"
										name="productCode"
										id="productCode"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.productCode}
										error={Boolean(formik.touched.productCode && formik.errors.productCode)}
										helperText={formik.touched.productCode && formik.errors.productCode}

									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="serialNumber">Serial Number</label>
									<TextField
										size="small"
										variant="outlined"
										type="text"
										name="serialNumber"
										id="serialNo"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.serialNumber}
										error={Boolean(formik.touched.serialNumber && formik.errors.serialNumber)}
										helperText={formik.touched.serialNumber && formik.errors.serialNumber}

									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="invoiceNumber">Invoice Number</label>
									<TextField
										size="small"
										type="text"
										variant="outlined"
										name="invoiceNumber"
										id="invoiceNumber"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.invoiceNumber}
										error={Boolean(formik.touched.invoiceNumber && formik.errors.invoiceNumber)}
										helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}

									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="invoiceDate">Invoice Date</label>
									<TextField
										size="small"
										variant="outlined"
										type="date"
										name="invoiceDate"
										id="invoiceDate"
										spellCheck="false"
										onChange={formik.handleChange}
										value={formik.values.invoiceDate}
										error={Boolean(formik.touched.invoiceDate && formik.errors.invoiceDate)}
										helperText={formik.touched.invoiceDate && formik.errors.invoiceDate}
									/>
								</div>
								<div className={styles.inputField}>
									<label htmlFor="file">Invoice Attach (Only pdf files are accepted)</label>
									<TextField
									    inputProps={{accept:"application/pdf"}}
										size="small"
										variant="outlined"
										type="file"
										name="file"
										onChange={(event) => formik.setFieldValue("file", event.target.files[0])}
									/>
								</div>
								<Button
									variant="contained"
									color="primary"
									className={styles.submitButton}
									type="submit"
								>
									Submit
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Container>
		</div>
	);
}
