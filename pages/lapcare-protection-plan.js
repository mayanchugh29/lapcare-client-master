import React from "react";
import styles from "../styles/Lpp.module.css";

//Material Ui Imports
import { Container,  Box } from "@material-ui/core";


//Page Compone nts
import LppFeatures from "../src/components/lpp/LppFeatures";
import LppPlaneAcc from "../src/components/lpp/LppPlaneAcc";
import ClaimTerms from "../src/components/lpp/ClaimTerms";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";

const Home = (props) => {
	return (
		<>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "LPP", route: "/lapcare_protection_plan" },
				]}
			/>
			<Container className={styles.mainContainer} maxWidth="lg">
				<LppPlaneAcc />
				<LppFeatures />
				<ClaimTerms />
			</Container>

			<Box p={1}></Box>
		</>
	);
};

export default Home;
