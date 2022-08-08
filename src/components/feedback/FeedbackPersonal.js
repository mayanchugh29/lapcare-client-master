import React from "react";

import { Grid, TextField } from "@material-ui/core";
import styles from "../../../styles/Feedback.module.css";

export default function LuckyWinnerFrm(props) {
	return (
		<div className={styles.formContainer}>
			<Grid container spacing={3} className="pt_30">
				<Grid item xs={12} sm={6} md={6}>
					<TextField
						required
						variant="outlined"
						name="complaintNo"
						label="Complaint No"
						fullWidth
						autoComplete="complaintNo"
						value={props.values.complaintNo}
						onChange={props.onChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<TextField
						required
						variant="outlined"
						id="name"
						name="name"
						label="Name"
						fullWidth
						autoComplete="name"
						value={props.values.name}
						onChange={props.onChange}
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={6}>
					<TextField
						required
						type="email"
						variant="outlined"
						name="email"
						label="Email"
						fullWidth
						autoComplete="email"
						value={props.values.email}
						onChange={props.onChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<TextField
						required
						variant="outlined"
						type="tel"
						name="phone"
						label="Phone"
						fullWidth
						autoComplete="phone"
						value={props.values.phone}
						onChange={props.onChange}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
