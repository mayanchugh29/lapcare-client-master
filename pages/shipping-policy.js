import React from "react";
import { Container, Typography } from "@material-ui/core";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import styles from "../styles/PrivacyPolicy.module.css";

const ShippingPolicy = (props) => {
	return (
		<React.Fragment>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Shipping Policy", route: "/shipping-policy" },
				]}
			/>
			<Container className={styles.mainContainer}>
				<Typography variant="h3" gutterBottom>Shipping</Typography>
                <br />
				<div className={styles.content}>
					<Typography variant="body2">
						<ol style={{ marginLeft: "25px" }} type="a">
							<li>
								You can find out if Lapcare delivers to your PIN Code using the courier serviceability tool available on the product page. Please tap on “Check Delivery options” and enter your area PIN code in the respective field to get the required information about standard order delivery time and availability of Cash on Delivery for the Product selected. The PIN codes serviced by us are frequently updated, so if we do not deliver to your PIN code today, please come back and check to see if this has changed.
							</li>
							<li>
								The Products shall be delivered within 3–14 working days. In case of unforeseen / unexpected delay, the same shall be intimated to you.
							</li>
							<li>
								Orders paid by credit/ debit card will be refunded by credit back to the credit/ debit card within 7 working days and the refund will reflect in the next statement.
							</li>
							<li>
								Orders paid by net banking accounts will be credited back to bank account
							</li>
							<li>For Orders amounting to Rs. 500 and below an extra of Rs 50 of shipping charges will be charged to the user.</li>
						</ol>
					</Typography>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default ShippingPolicy;
