import React, { useState } from "react";
import {
	Modal,
	Card,
	CardContent,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	FormControl,
	FormGroup,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/styles";

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

const FilterModal = (props) => {
	const initialProducts = props.initialProducts;
	const [attributeActive, setattributeActive] = useState([]);
	const [checkedValues, setcheckedValues] = useState([])

	const closeHandler = () => {
		props.onClose();
	};

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

		if(checkedValues.length===0){
			setcheckedValues(prev=>[...prev,event.target.value])
		}else{
			const tempCheckedValues=[]
		checkedValues.forEach((value,i)=>{
			if(value===event.target,value){

			}else{
				tempCheckedValues.push(event.target.value)
			}

			i===checkedValues.length-1?setcheckedValues(tempCheckedValues):null
		})
		}
	};

	return (
		<Modal open={props.open} onClose={closeHandler}>
			<Card>
				<CardContent>
					<div>
						<Typography style={{ margin: "20px 0" }} variant="h5">
							Filters
						</Typography>
						{props.filters.map((filter, index) => (
							<Accordion elevation={0} key={index}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant="h6">{filter.name}</Typography>
								</AccordionSummary>
								<AccordionDetails
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<FormControl component="fieldset">
										<FormGroup
											name={filter.name}
											onChange={(event) => handleFilterChange(event, filter._id)}
										>
											{filter.values.map((value, index) => (
												<FormControlLabel
													key={index}
													value={value}
													control={
														<CustomCheckbox
															checked={checkedValues.includes(value)}
														/>
													}
													label={value}
												/>
											))}
										</FormGroup>
									</FormControl>
								</AccordionDetails>
							</Accordion>
						))}
					</div>
				</CardContent>
			</Card>
		</Modal>
	);
};

export default FilterModal;
