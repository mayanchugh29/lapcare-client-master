import React from "react";
import ReactHtmlParser from "react-html-parser";
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

const TechSpecifications = (props) => {
	const string= (param)=>{
		const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
         return param.replace(regex, '<br>');
	}
	return (
		props.specs.length!==0?
		<Container className={styles.tech_specification} maxWidth="lg">
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Box className={styles.heading_container}>
						<Typography variant="h3" align="center">
							Technical Specifications
						</Typography>
					</Box>
				</Grid>

				{props.specs.map((object, i) => (
					<Grid item xs={12} md={6} key={i}>
						<Accordion
							style={{
								"boxShadow":
									"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
							}}
						>
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon
										className={styles.expand_icon}
									/>
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={styles.acc_heading}>
									{object.key}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{ReactHtmlParser(string(object.value))}</Typography>
							</AccordionDetails>
						</Accordion>
					</Grid>
				))}
			</Grid>
		</Container>
		:null
	);
};

export default TechSpecifications;