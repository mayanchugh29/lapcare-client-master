import React from "react";
import AllData from "../../data/allData.json";
import styles from "../../../styles/Lpp.module.css";
import { Container, Typography } from "@material-ui/core";

const ClaimTerms = () => {
	return (
		<Container className={styles.termsMainContainer}>
			{AllData.lpp.map((post,i) => {
				if (post.lpp_section_id == 1)
					return (
						<div key={i}>
							{post.processAndTerms.map((post,i) => {
								return (
									<div className={styles.termsListContainer} key={i}>
										<Typography style={{ fontSize: "22px", fontWeight: "500" }}>
											{post.title}
										</Typography>
										<ol>
											{post.description.map((post,i) => {
												return (
													<li key={i}>
														<Typography>{post.item}</Typography>
													</li>
												);
											})}
										</ol>
									</div>
								);
							})}
						</div>
					);
			})}
		</Container>
	);
};

export default ClaimTerms;
