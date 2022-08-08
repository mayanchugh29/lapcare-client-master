import React,{useState,useEffect} from "react";
import {
	Modal,
	Card,
	CardContent,
	Typography,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio
} from "@material-ui/core";


const SortModal = (props) => {
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
	const closeHandler = () => {
		props.onClose();
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<Modal open={props.open} onClose={closeHandler}>
			<Card>
				<CardContent>
					<Typography variant="h5" style={{ margin: "20px 5px" }}>
						Sort By
					</Typography>
					<FormControl component="fieldset" margin="none" >
						<RadioGroup name="Sort By" onChange={handleChange}>
							<FormControlLabel value="low-high" control={<Radio />} label="Price Low To High" />
							<FormControlLabel value="high-low" control={<Radio />} label="Price High to Low" />
							<FormControlLabel value="popularity" control={<Radio />} label="Popularity" />
							<FormControlLabel value="ratings" control={<Radio />} label="Ratings" />
						</RadioGroup>
					</FormControl>
				</CardContent>
			</Card>
		</Modal>
	);
};

export default SortModal;
