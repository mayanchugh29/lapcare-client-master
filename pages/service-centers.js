import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../src/middlewares/axios/baseUri";
import { Container, Grid, Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";

import styles from "../styles/ServiceCenters.module.css";

const ServiceCenter = (props) => {
	const [showBranch, setShowBranch] = useState(titleCase("search your city"));
	const [serviceCenters, setServiceCenters] = useState(props.data);


	const selectServiceCenters = (value) => {
		setShowBranch(titleCase(value));
		if (value === "showall" || value === null) {
			setServiceCenters(props.data);
		} else {
			let selectedBranches = props.data.filter((branch) => branch.location === value);
			setServiceCenters(selectedBranches);
		}
	};

	function titleCase(string) {
		return string ? string[0].toUpperCase() + string.slice(1).toLowerCase() : "";
	}

	const locations = props.data.map((branch) => branch.location);
	locations.sort((a, b) => a.localeCompare(b));

	return (
		<div>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Service Centers", route: "/service-centers" },
				]}
			/>
			<Container className={styles.parent_container}>
				<div className={styles.location_filter}>
					<Grid container spacing={2}>
						<Grid item sm={12} md={8}>
							<Typography variant="h3">Service Centers</Typography>
						</Grid>
						<Grid item sm={12} md={4} className={styles.location_filter_r}>
							<Autocomplete
								id="branch-select"
								options={locations}
								getOptionLabel={(option) => titleCase(option)}
								value={showBranch}
								onChange={(event, newValue) => {
									selectServiceCenters(newValue);
								}}
								style={{ width: 250 }}
								renderInput={(params) => <TextField {...params} label="Search Branch" variant="outlined" size="small" />}
							/>
						</Grid>
					</Grid>
				</div>
				<Grid spacing={3} container className={styles.branchList}>
					{serviceCenters.map((branch) => (
						<Grid key={branch._id} item xs={12} sm={6} md={4}>
							<div className={styles.branchCard}>
								<Typography style={{ marginBottom: "10px", fontWeight: 600 }} className={styles.addressText}>
									{branch.name}
								</Typography>
								<Typography style={{ marginBottom: "10px" }} className={styles.addressText}>
									{branch.address}
								</Typography>
								<Typography className={styles.addressText}>
									<span style={{ fontWeight: "500" }}>Contact : </span> {branch.contact}
								</Typography>
								<Typography className={styles.addressText}>
									<span style={{ fontWeight: "500" }}>Email : </span> {branch.email}
								</Typography>
							</div>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export async function getServerSideProps(context) {
	const res = await axios.get(base_url + "/serviceCenters");
	let data = res.data.data;
	return {
		props: { data },
	};
}

export default ServiceCenter;
