import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Tab, Tabs, AppBar, Typography } from "@material-ui/core";
import styles from "../../../styles/componentStyles/ThisMonthPick.module.css";

import SectionTitleLayout1 from "../layout/SectionTitleLayout1";
import ThisMothPickComponent from "./ThisMothPickComponent";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<span
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Box variant="body1">{children}</Box>
				</Box>
			)}
		</span>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}

export default function ThisMonthPic(props) {
	const [value, setValue] = React.useState(0);

	const handleChange = async (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Container className={styles.this_month_tab_outer} maxWidth="lg">
				<Grid container spacing={2} justify="center">
					<Grid item md={12}>
						<Typography variant="h3" style={{ margin: "20px 0 5px", fontWeight: 500 }} align="center">
							This Month's Pick
						</Typography>
					</Grid>
				</Grid>
				<Grid container spacing={2} className={styles.appbar_container} justifyContent="center">
					<AppBar position="static" color="transparent" className={styles.this_month_appbar}>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							className={styles.tabs_inn}
							scrollButtons="on"
							TabIndicatorProps={{ style: { backgroundColor: "white" } }}
						>
							<Tab label="Components" {...a11yProps(1)} className={styles.tab_item} />
							<Tab label="Audio" {...a11yProps(2)} className={styles.tab_item} />
							<Tab label="Peripherals" {...a11yProps(3)} className={styles.tab_item} />

							<Tab label="Accessories" {...a11yProps(4)} className={styles.tab_item} />
							<Tab label="Power Solutions" {...a11yProps(5)} className={styles.tab_item} />
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0} style={{ width: "100%" }} className={styles.this_month_tabpanel}>
						<ThisMothPickComponent
							products={props.categories[0].highlighted_products}
							banner="https://lapcare.sgp1.digitaloceanspaces.com/Component.jpg"
							route="category/ssd"
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={1}
						style={{ width: "100%", maxWidth: "lg" }}
						className={styles.this_month_tabpanel}
					>
						<ThisMothPickComponent
							products={props.categories[1].highlighted_products}
							banner="https://lapcare.sgp1.digitaloceanspaces.com/Audio.jpg"
							route="/category/speaker"
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={2}
						style={{ width: "100%", maxWidth: "lg" }}
						className={styles.this_month_tabpanel}
					>
						<ThisMothPickComponent
							products={props.categories[2].highlighted_products}
							banner="https://lapcare.sgp1.digitaloceanspaces.com/Periphrels.jpg"
							route="/category/mouse"
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={3}
						style={{ width: "100%", maxWidth: "lg" }}
						className={styles.this_month_tabpanel}
					>
						<ThisMothPickComponent
							products={props.categories[3].highlighted_products}
							banner="https://lapcare.sgp1.digitaloceanspaces.com/Accessories.jpg"
							route="/category/laptop-stand"
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={4}
						style={{ width: "100%", maxWidth: "lg" }}
						className={styles.this_month_tabpanel}
					>
						<ThisMothPickComponent
							products={props.categories[4].highlighted_products}
							banner="https://lapcare.sgp1.digitaloceanspaces.com/Power%20Solutions.jpg"
							route="/category/laptop-batteries"
						/>
					</TabPanel>
				</Grid>
			</Container>
		</div>
	);
}
