import React, { useState } from "react";
import { Grid, Typography, FormControl, Select, MenuItem } from "@material-ui/core";

import styles from "../../../styles/Contact.module.css";

function LocationSearchOverIndia(props) {
	const [showBranch, setShowBranch] = useState("showall");
	const [branches, setBranches] = useState(props.branches);

	const selectBranches = (event) => {
		setShowBranch(event.target.value);
		if (event.target.value === "showall") {
			setBranches(props.branches);
		} else {
			let selectedBranches = props.branches.filter((branch) => branch.warehouseId === event.target.value);
			setBranches(selectedBranches);
		}
	};

	return (
		<div>
			<div className={styles.location_filter}>
				<Grid container spacing={2}>
					<Grid item sm={12} md={8}>
						<Typography variant="h3">Our branches in all over India</Typography>
					</Grid>

					<Grid item sm={12} md={4} className={styles.location_filter_r}>
						<FormControl size="small" className={styles.formControl} variant="outlined">
							<Select labelId="branch-select-label" id="branch-select" onChange={selectBranches} value={showBranch}>
								<MenuItem value="showall">Show all</MenuItem>
								{props.branches.map((branch) => {
									return (
										<MenuItem key={branch._id} value={branch.warehouseId}>
											{branch.branch}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</div>
			<Grid spacing={3} container className={styles.branchList}>
				{branches.map((branch) => (
					<Grid key={branch._id} item xs={12} sm={6} md={4}>
						<div className={styles.branchCard}>
							<Typography style={{ marginBottom: "10px" }} className={styles.addressText}>
								{branch.address}
							</Typography>
							<Typography className={styles.addressText}>
								{" "}
								<span style={{ fontWeight: "500" }}>Contact : </span> {branch.contact}
							</Typography>
						</div>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

export default LocationSearchOverIndia;
