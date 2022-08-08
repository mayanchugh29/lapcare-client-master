import React from "react";
import Link from "next/link";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Box, TextField,InputAdornment,IconButton,FormControl } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../../../../styles/componentStyles/MobileMenu.module.css";
import { useRouter } from "next/dist/client/router";
import encodeUrl from "../../../helpers/url";
import { useFormik } from "formik";
import * as gtag from '../../../helpers/gtag'

const useStyles = makeStyles({
	MuiAccordionroot: {
		"&.MuiAccordion-root:before": {
			backgroundColor: "white",
		},
		"&.Mui-expanded": {
			margin: "0px",
		},
	},
	MuiAccordionSummaryRoot: {
		height: "10px",
		padding: "0",
		content: {
			margin: "0px !important",
		},
	},
	MuiAccordionDetailsRoot: {
		padding: "0 8px 2px",
	},
});

export default function MobileMenu(props) {
	const classes = useStyles();
	const router = useRouter()

	const getAntivirusSku = (name)=>{
        if(name==='Ultimate Security'){
            return 'LOSFUS7148'
        }else if(name==='Lapcare AV Pro'){
            return 'LPSCAN2202'
        }else{
            return 'LPSCAN2201'
        }
    }

	const getUri = (category, name) => {
		if (category === "Antivirus") {
			return `/antivirus/${encodeUrl(name.toLowerCase())}/${getAntivirusSku(name)}`
		} else {
			return `/category/${encodeUrl(name)}`
		}
	}

	const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: values => {
            gtag.event({
                action:"search",
                category:'ecommerce',
                label:'Product Search',
                value:1
			})
			props.setState((prevState) => ({ ...prevState, drawerOpen: false }))
            router.push(`/search/${values.query}`)
        }
    })

	return (
		<div className={styles.mainContainer}>
			<div style={{marginBottom:"7px"}} className={styles.menuItem}>
            <form onSubmit={formik.handleSubmit}>
			<FormControl>
							<TextField
								name="query"

											placeholder="Search for products"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end" >
														<IconButton type="submit">
															<SearchIcon color="primary" />
														</IconButton>
													</InputAdornment>
												),
											}}
											onChange={formik.handleChange}
										/>
									</FormControl>
					</form>
				</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/">
					<a>
						<Typography className={styles.menuText}>Home</Typography>
					</a>
				</Link>
				
			</div>
			
			<div className={styles.menuItem}>
				{props.categories.map((category) => (
					<div key={category.name}>
						<Accordion classes={{ root: classes.MuiAccordionroot }} elevation={0}>
							<AccordionSummary
								classes={{ root: classes.MuiAccordionSummaryRoot }}
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={styles.menuText}>{category.name}</Typography>
							</AccordionSummary>
							<AccordionDetails
								classes={{ root: classes.MuiAccordionDetailsRoot }}
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									gap: "8px",
								}}
							>
								{category.child_categories.map((item) => (

									<div className={classes.categoryItem} key={item.name} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
										<Link href={getUri(category.name, item.name)} onClick ><a>	<Typography>{item.name}</Typography></a>
										</Link>
									</div>

								))}
							</AccordionDetails>
						</Accordion>
					</div>
				))}
			</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/register">
					<a>
						<Typography className={styles.menuText}>Register Product</Typography>
					</a>
				</Link>
			</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/lapcare-protection-plan">
					<a>
						<Typography className={styles.menuText}>LPP</Typography>
					</a>
				</Link>
			</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/contact-us">
					<a>
						<Typography className={styles.menuText}>Contact Us</Typography>
					</a>
				</Link>
			</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/service-centers">
					<a>
						<Typography className={styles.menuText}>Service Centers</Typography>
					</a>
				</Link>
			</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/feedback">
					<a>
						<Typography className={styles.menuText}>Feedback</Typography>
					</a>
				</Link>
			</div>
			<div className={styles.menuItem} onClick={()=>props.setState((prevState) => ({ ...prevState, drawerOpen: false }))}>
				<Link href="/career">
					<a>
						<Typography className={styles.menuText}>Career</Typography>
					</a>
				</Link>
			</div>
		</div>
	);
}
