import React from "react";
import { Button, Typography } from "@material-ui/core";
import Icon from "@material-ui/icons/SentimentVeryDissatisfied";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import { useRouter } from "next/router";

import styles from "../styles/404.module.css";

const serverErrorPage = () => {
	const router = useRouter();

	return (
		<div className={styles.root}>
			<AccBreadcrumbs breadcrumbs={[{ routeName: "Home", route: "/" }]} />
			<div className={styles.content}>
				
				<Typography variant="h4">
					<span style={{ color: "#ffc815" }}>Under Maintenance</span>{" "}
					We are coming back soon !!!
				</Typography>
				<Button
					variant="outlined"
					color="primary"
					onClick={() => router.push("/")}
				>
					Home
				</Button>
			</div>
		</div>
	);
};

export default serverErrorPage;
