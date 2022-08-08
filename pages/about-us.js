import React from "react";
import { Container, Typography } from "@material-ui/core";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import styles from "../styles/PrivacyPolicy.module.css";

const PrivacyPolicy = (props) => {
	return (
		<React.Fragment>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "About Us", route: "/about-us" },
				]}
			/>
			<Container className={styles.mainContainer}>
				<div className={styles.title}>
					<Typography variant="h3">About Us</Typography>
				</div>
				<div className={styles.content}>
					<Typography variant="body2">
						<ul style={{ marginLeft: "15px" }}>
							<li>
								LAPCARE is an award-winning international brand well recognized for offering consumer technology products. Over the years it has created a forte in laptop peripherals and accessories for all premium brands of laptops.
							</li>
							<li>Established in 1997 in Singapore and entered the Indian market in 2007 associating with Rx Infotech Pvt. limited.</li>
							<li>First of all, It has offices/branches across 36 locations in the country. More so Lapcare has also carved in as a niche one-stop shop offering quality consumer technology products at highly affordable pricing.</li>
							<li>Acknowledged for its quality, Lapcare has added many accolades to its kitty, as a result, It has also bagged India’s Greatest Brands Award 2017-2018.</li>
							<li>
								Most noteworthy Lapcare’s niche offering includes various compatible laptop spares to all major laptop brands. Lapcare brand accessories and mobility solution backed with high-quality standards.
							</li>
							<li>Keeping customer centricity, Lapcare had extended 1-year warranty that equates closely to original laptop products. Keeping the affordable price helps spread its market presence across segments in India.</li>
							<li>
								Even more, we would like to be accepted as a true customer focus brand, which is sensitive towards customer service with the best quality products to their doorsteps. Lapcare is a best known for its customer delight because it focuses on the Innovative and adopting the latest technology. With a dealership network of over 6000 across India, Lapcare has a strong foothold across all major cities of India.
							</li>
							<li>
								It is rapidly expanding its network base to reach out to its customers, as a caring neighbor. Our rich network of distributors connects you to your Lapcare authorized store in your city
							</li>
						</ul>
					</Typography>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default PrivacyPolicy;
