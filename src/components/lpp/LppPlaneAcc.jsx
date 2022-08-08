import React from "react";
import ReactHtmlParser from "react-html-parser";
import styles from "../../../styles/Lpp.module.css";
import { Typography } from "@material-ui/core";

const lppData = [
	{
		title: `Product registration mandatory within 30 days`,
		description: `Normally a user gives little attention to the power components and devices they use. 
    But there have been serious cases when laptop battery or adapter has exploded while in use. 
    This may be a serious threat to your expensive laptop too.<br /><br />

    Lapcare now brings you quality certified power components and devices that not only 
    carries a standard warranty but also offer a unique insurance plan.`,
		id: 1,
	},
	{
		title: `Lapcare - consumer first    `,
		description: `Lapcare under its customer centric approach to provide world class and safe products to its consumers, 
    Lapcare presents a unique equipment safety plan called Lapcare Protection Plan. LPP is a step towards ensuring 
    higher safety standards of Lapcare power components and devices, conforming to strict International quality standards.
    This is a result of an extensive R & D and stringent testing of all Lapcare power components ad equipments.
    `,
		id: 2,
	},
	{
		title: `What is LPP ?    `,
		description: `LPP is a unique equipment safety plan called Lapcare Protection Plan. Under LPP any damage that is caused to your connected equipment using a lapcare device ( under this plan), will be insured for upto Rs. 20,000.
    `,
		id: 3,
	},
];

export default function LppPlaneAcc() {
	return (
		<div className={styles.headerDiv}>
			<div className={styles.descriptionDivImg}>
				<img src="https://lapcare.sgp1.digitaloceanspaces.com/home/lpp/lapcare_001.jpg" alt="lpp" />
				<div>
					<Typography className={styles.headingTitle}>{lppData[0].title}</Typography>
					<Typography className={styles.headingDescription}>
						{ReactHtmlParser(lppData[0].description)}
					</Typography>
				</div>
			</div>

			<div className={styles.descriptionDiv}>
				<Typography className={styles.headingTitle}>{lppData[1].title}</Typography>
				<Typography className={styles.headingDescription}>{lppData[1].description}</Typography>
			</div>
			<div className={styles.descriptionDiv}>
				<Typography className={styles.headingTitle}>{lppData[2].title}</Typography>
				<Typography className={styles.headingDescription}>{lppData[2].description}</Typography>
			</div>
		</div>
	);
}
