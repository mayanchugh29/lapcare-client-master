import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	FormControl,
	Checkbox,
	FormGroup,
	FormControlLabel,
	TextField,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles, makeStyles } from "@material-ui/styles";
import styles from "../../../styles/ProductCategory.module.css";
import { useRouter } from "next/router";

const CustomCheckbox = withStyles({
	root: {
		"&$checked": {
			"& .MuiIconButton-label": {
				position: "relative",
				zIndex: 0,
			},
			"& .MuiIconButton-label:after": {
				content: '""',
				left: 4,
				top: 4,
				height: 15,
				width: 15,
				position: "absolute",
				backgroundColor: "black",
				zIndex: -1,
			},
		},
	},
	checked: {},
})(Checkbox);

const categories = [
	{
		name: "Power Solutions",
		values: ["Laptop Batteries", "Laptop Adapter", "UPS", "Spike Buster"],
	},
	{
		name: "Spares",
		values: ["Motherboard", "SSD", "Toner Cartridges", "Ram"],
	},
	{
		name: "Audio",
		values: ["Headset", "Speaker"],
	},
	{
		name: "Perhaps",
		values: ["Keyboard", "Mouse", "Wireless Combo", "Desktop Power Supplies","CCTV Power Supplies", "Monitors", "Web Cameras","Barcode Scanner"],
	},

	{
		name: "Accessories",
		values: [
			"Mobile Cable",
			"Hub",
			"Laptop Stand",
			"Dongle",
			"IT Cable",
			"Security Locks",
			"Car Inverter",
			"Docking Station",
			"Wall Charger",
			"Storage Devices",
			"Cleaning Kit",
			"Bagpack"
		],
	},
	{
		name: "Anti-Virus",
		values: ["Lapcare AV Pro", "Total Security", "Ultimate Security", "AV Pro"],
	},
];

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
		content: {
			margin: "0px",
		},
	},
	MuiAccordionDetailsRoot: {
		padding: "0 8px 2px",
	},
});

const Filter = (props) => {
	const classes = useStyles();
	const [highlightedCategory, sethighlightedCategory] = useState([]);
	const router = useRouter();
	const initialProducts = props.initialProducts;
	const [attributeActive, setattributeActive] = useState([]);

	const handleFilterChange = async (event, filterId) => {
		if (attributeActive.some((e) => e.filterId === filterId)) {
			setattributeActive(attributeActive.filter((e) => e.filterId !== filterId));
			const initialAttributes = attributeActive.filter((e) => e.filterId !== filterId);
			const filteredProducts = [];
			if (initialAttributes.length === 0) {
				props.setproducts(initialProducts);
			} else {
				initialAttributes.map(
					(initialAttribute, i) => (
						initialProducts.map((product) =>
							product.attributes.map((variant) =>
								variant.attribute === initialAttribute.filterId
									? variant.value == initialAttribute.value
										? filteredProducts.push(product)
										: null
									: null
							)
						),
						i === initialAttributes.length - 1 ? props.setproducts(filteredProducts) : null
					)
				);
			}
		} else {
			const filteredProducts = [];
			props.products.map(
				(product, i) => (
					product.attributes.map((variant) =>
						variant.attribute === filterId
							? variant.value == event.target.value
								? filteredProducts.push(product)
								: null
							: null
					),
					i === props.products.length - 1
						? (props.setproducts(filteredProducts),
						  setattributeActive([...attributeActive, { filterId: filterId, value: event.target.value }]))
						: null
				)
			);
		}
	};
	useEffect(() => {
		categories.map((category) => {
			if (category.values.includes(props.category)) {
				sethighlightedCategory(category.name);
			}
		});
	}, [props.category]);


	const renderFilterFields = (filter) => {
		if (filter.values.length < 25) {
			return filter.values.map((value, index) => (
				<FormControlLabel   style={{ fontSize:"14px !important", fontWeight:"300"}} key={index} value={value} control={<CustomCheckbox  style={{ fontSize:"14px !important", fontWeight:"300"}} />} label={value} sx={{ fontSize:"14px !important", fontWeight:"300"}}/>
			));
		} else {
			const newValues = filter.values.filter((value, index) => index < 25);

			return newValues.map((value, index) => (
				<FormControlLabel  key={index} value={value} control={<CustomCheckbox  style={{ fontSize:"14px !important", fontWeight:"300"}} />} label={value}  sx={{ fontSize:"14px !important", fontWeight:"300"}} />
			));
		}
	};

	return (
		<div>
			<Typography color="primary" style={{ marginLeft: "14px",fontSize:"16px" }}>
				CATEGORY
			</Typography>
			{categories.map((category, index) =>
				category.name === highlightedCategory ? (
					<Accordion classes={{ root: classes.MuiAccordionroot }} elevation={0} key={index} defaultExpanded>
						<AccordionSummary
							classes={{ root: classes.MuiAccordionSummaryRoot }}
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography >{category.name}</Typography>
						</AccordionSummary>
						<AccordionDetails
							classes={{ root: classes.MuiAccordionDetailsRoot }}
							style={{ display: "flex", flexDirection: "column" }}
						>
							<div style={{ marginLeft: "25px"}}>
								{category.values.map((value, index) => (
									<p
										key={index}
										onClick={() => router.push(`/category/${value}`)}
										className={
											value === props.category ? styles.highlighted_category : styles.category
										}
									>
										{value}
									</p>
								))}
							</div>
						</AccordionDetails>
					</Accordion>
				) : null
			)}
			<div style={{ marginTop: "20px" }}>
				{props.filters.map((filter, index) => (
					<div style={{ borderTop: "1px solid #e6e6e6", padding: "0.5rem 0" }} key={index}>
						<Accordion
							classes={{ root: classes.MuiAccordionroot }}
							color="primary"
							elevation={0}
							key={index}
						>
							<AccordionSummary
								classes={{ root: classes.MuiAccordionSummaryRoot }}
								expandIcon={<ExpandMoreIcon />}
								
							>
								<Typography variant="h6" style={{fontWeight:"400"}}>{filter.name}</Typography>
							</AccordionSummary>
							<AccordionDetails
								classes={{ root: classes.MuiAccordionDetailsRoot }}
								style={{
									display: "flex",
									flexDirection: "column",
									fontWeight:"300",
									fontSize:"14px !important"
								}}
							>
								<FormControl component="fieldset">
									<FormGroup
										name={filter.name}
										onChange={(event) => handleFilterChange(event, filter._id)}
									>
										{filter.values.length > 25 ? (
											<FormControl style={{ marginBottom: "8px", fontSize:"14px"}}>
												<TextField
													placeholder="Search"
													InputProps={{
														endAdornment: (
															<InputAdornment >
																<IconButton >
																	<SearchIcon color="primary" />
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											</FormControl>
										) : null}
										{renderFilterFields(filter)}
									</FormGroup>
								</FormControl>
							</AccordionDetails>
						</Accordion>
					</div>
				))}
			</div>
		</div>
	);
};

export default Filter;
