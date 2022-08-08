import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import styles from "../../../styles/Contact.module.css";

import { Container, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import AllData from "../../data/allData.json";

function LocationSearchWorldWise() {
	const [showhide, setShowHide] = useState("showall");

	return (
		<div className={styles.parent_container}>
			{AllData.location_over_world.map((post) => {
				if (post.location_over_world_section_id == 1)
					return (
						<Grid
							container
							spacing={4}
							className={styles.branchList}
							key={post.location_over_world_section_id}
						>
							{post.location_item.map((post,i) => {
								return (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										className={
											showhide == post.location_item_id || showhide == "showall" ? "show" : "hide"
										}
										key={i}
									>
										<Box className={styles.mapCard}>
											<Box className="product_inn">
												<Box>
													<Typography variant="h4" className="mb_3">
														{ReactHtmlParser(post.company_name)}
													</Typography>
													<Typography variant="body1">
														{ReactHtmlParser(post.address)}
													</Typography>
													<Typography variant="body1" className="mt_2">
														{ReactHtmlParser(post.email)}
													</Typography>
													<Typography variant="body1" className="mt_2">
														{ReactHtmlParser(post.fax)}
													</Typography>
													<Typography variant="body1" className="mt_2">
														{ReactHtmlParser(post.phone)}
													</Typography>
												</Box>

												<Box className="mt_3">
													<iframe
														style={{ border: "0px" }}
														src={post.googlemap}
														width="100%"
														height="280px"
													></iframe>
												</Box>
											</Box>
										</Box>
									</Grid>
								);
							})}
						</Grid>
					);
			})}
		</div>
	);
}

export default LocationSearchWorldWise;
