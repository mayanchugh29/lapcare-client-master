import React from "react";
import { Button, Typography } from "@material-ui/core";
import Icon from "@material-ui/icons/SentimentVeryDissatisfied";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import { useRouter } from "next/router";

import styles from "../styles/404.module.css";

const errorPage = () => {
	const router = useRouter();

	return (
		<div className={styles.root}>
			<AccBreadcrumbs breadcrumbs={[{ routeName: "Home", route: "/" }]} />
			<div className={styles.content}>
				<Icon
					style={{
						color: "#ffc815",
						fontSize: "80px",
					}}
				/>
				<Typography variant="h2">Error 404</Typography>
				<Typography variant="h4">
					<span style={{ color: "#ffc815" }}>Whoooops....</span> The
					Content that you are looking for doesn't exist !!
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

export default errorPage;
