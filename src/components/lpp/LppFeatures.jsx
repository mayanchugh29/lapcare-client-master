import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import styles from "../../../styles/Lpp.module.css";

const featuresData = [
	{
		title: "Adapters",
		imgsrc: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lpp/lapcare_001.png",
		description: [
			{
				item: `Over current protection`,
			},
			{
				item: `No load protection`,
			},
			{
				item: `Surge Protection`,
			},
			{
				item: `Over voltage protection`,
			},
			{
				item: ` Over temperature protection`,
			},
		],
	},
	{
		title: "Laptop Battery",
		imgsrc: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lpp/lapcare_002.png",
		description: [
			{
				item: `High quality cells`,
			},
			{
				item: `High quality PVC`,
			},
			{
				item: `High quality PVC`,
			},
		],
	},
	{
		title: "UPS",
		imgsrc: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lpp/lapcare_003.png",
		description: [
			{
				item: `Automatic Voltage regulation`,
			},
			{
				item: `Auto-restart/ auto- charge`,
			},
			{
				item: `Generator Compatible`,
			},
			{
				item: `Cold Start Function`,
			},
			{
				item: ` Off mode Charging`,
			},
			{
				item: ` Double Boost Design`,
			},
			{
				item: ` 2 Years onsite Warranty on UPS electronics and Battery`,
			},
			{
				item: ` 3rd year extended warranty on UPS electronics (on carrying it to service center)`,
			},
		],
	},
	{
		title: "Power Extensions",
		imgsrc: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lpp/lapcare_004.png",
		description: [
			{
				item: `Durable and fire-proof case`,
			},
			{
				item: `Safety shutter`,
			},
			{
				item: `Power indicator light`,
			},
			{
				item: `Individual switches for each socket`,
			},
		],
	},
	{
		title: "Car Power Inverter",
		imgsrc: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lpp/lapcare_005.png",
		description: [
			{
				item: `Short circuit protection`,
			},
			{
				item: `Overload protection`,
			},
			{
				item: `Overheating protection`,
			},
		],
	},
];

const LppFeatures = () => {
	return (
		<Container className={styles.featuresContainer} maxWidth="lg">
			<div className={styles.featureHeaderContainer}>
				<Typography className={styles.headerText}>
					Some of the features and specifications that ensure you of that extra edge of safety are:
				</Typography>
			</div>
			<div className={styles.featureContentContainer}>
				{featuresData.map((featureData, index) => (
					<div key={index} className={styles.productCard}>
						<img src={featureData.imgsrc} alt="Product Image" />
						<ul>
							{featureData.description.map((description, index) =>
								index < 3 ? (
									<li key={index}>
										<Typography>{description.item}</Typography>
									</li>
								) : (
									""
								)
							)}
						</ul>
					</div>
				))}
			</div>
			<div className={styles.featureFooterContainer}>
				<Typography color="secondary">
					So, be it before your purchase, during it or after it, for all of your accessories and peripheral
					component requirements, Lapcare is the synonym to safety quality, and reliability. We ensure you of
					asmooth product engagement experience. Stay Safe.
				</Typography>
			</div>
		</Container>
	);
};

export default LppFeatures;
