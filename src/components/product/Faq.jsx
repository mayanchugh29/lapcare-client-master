import React from "react";

import {
	Container,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "../../../styles/Product.module.css";

const faq = [
	{
		q:"What about replacement or return?",
		a:"10 days full return or replacement policy"
	},
	{
		q:"Will it be compatible for Inspiron 1545?",
		a:"No"
	}
]

const Faq = (props) => {
	return (
		<Container className={styles.faq_outer} maxWidth="lg">
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Box className={styles.heading_container}>
						<Typography variant="h4" align="center">
							Frequently asked Questions (FAQ)
						</Typography>
					</Box>
				</Grid>

				{faq.map((object, ind) => (
					<Grid item xs={12} md={12} key={ind}>
						<Accordion className={styles.faq_acc}>
							<AccordionSummary
								className={styles.faq_header} 
								expandIcon={
									<ExpandMoreIcon
										className={styles.expand_icon}
									/>
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={styles.faq_heading} variant="h5">
									{object.q}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography variant="h5">{object.a}</Typography>
							</AccordionDetails>
						</Accordion>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Faq;