import React, { useState, useEffect } from "react";
import _ from "lodash";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const Sort = (props) => {
	const [value, setValue] = useState("");

	useEffect(() => {
		let sortedProducts = props.products;
		if (value === "low-high") {
			sortedProducts.sort((a, b) => {
				return a.sellingPrice - b.sellingPrice;
			});
		}
		if (value === "high-low") {
			sortedProducts.sort((a, b) => {
				return b.sellingPrice - a.sellingPrice;
			});
		}

		const newSortedProducts = _.cloneDeep(sortedProducts);
		props.setproducts(newSortedProducts);
	}, [value]);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<FormControl style={{ minWidth: "100px" }} variant="outlined" size="small">
			<InputLabel id="sortLabel">Sort By</InputLabel>
			<Select labelId="sortLabel" id="sort" onChange={handleChange} label="Sort By" value={value}>
				<MenuItem value="low-high">Price Low to High</MenuItem>
				<MenuItem value="high-low">Price High to Low</MenuItem>
				<MenuItem value="popularity">Popularity</MenuItem>
				<MenuItem value="ratings">Ratings</MenuItem>
			</Select>
		</FormControl>
	);
};

export default Sort;
