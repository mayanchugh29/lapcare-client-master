import React, { useState, useEffect } from "react";
import styles from "../../styles/ProductCategory.module.css";
import { base_url } from "../../src/middlewares/axios/baseUri";
import axios from "axios";
import * as gtag from '../../src/helpers/gtag'

//Material Ui Imports
import { Container, Grid, Typography,TextField,
	IconButton,
	InputAdornment,
	FormControl } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SearchIcon from "@material-ui/icons/Search";


//Components Imports

import ProductCard from "../../src/components/category/ProductCard";
import Sort from "../../src/components/category/Sort";
import AccBreadcrumbs from "../../src/components/common/breadcrumbs/AccBreadcrumbs";
import router from "next/router";



const SearchProducts = (props) => {
	const [initialProducts, setinitialProducts] = useState(props.products);
	const [products, setproducts] = useState(props.products);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setproducts(props.products);
		setinitialProducts(props.products);
		gtag.event({
			action:"view_search_results",
			category:'ecommerce',
			label:'View Search results',
			value:1
		})
	}, [props.products]);


	useEffect(() => {
		
			if (searchTerm.length > 2) {
				let searchArray = initialProducts.filter(
					(product) => !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())
				);
				setproducts(searchArray);
			} else {
				setproducts(initialProducts);
			}
	}, [searchTerm]);


	const [toggleValue, setToggleValue] = useState("grid");
	const [grid, setGrid] = useState(true);



	const handleSearchTermChange = (event) => {
		setTimeout(() => {
			setSearchTerm(event.target.value);
		}, 1000);
	};



	return (
		<>
		<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: `Search`, route: `/search/${router.query.query}` },
				]}
			/>
			<Container className={styles.root} >
				<div className={styles.mainSectionSearchPage}>
					<div className={styles.productsSectionSearchPage}>
						<div className={styles.headingContainer}>
							<Typography style={{ fontSize: "14px", fontWeight: "500" }}>
								{products.length} Products
							</Typography>

							

							<div className={styles.toggleButtonGroup}>
								<div className={styles.searchField}>
									<FormControl>
										<TextField
											placeholder="Search"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton>
															<SearchIcon color="primary" />
														</IconButton>
													</InputAdornment>
												),
											}}
											onChange={handleSearchTermChange}
										/>
									</FormControl>
								</div>
								<Sort setproducts={setproducts} products={products} />
								<ToggleButtonGroup
									size="small"
									orientation="horizontal"
									value={toggleValue}
									exclusive
									color="secondary"
								>
									<ToggleButton
										value="grid"
										onClick={() => {
											setToggleValue("grid");
											setGrid(true);
										}}
									>
										<ViewModuleIcon />
									</ToggleButton>
									<ToggleButton
										value="list"
										onClick={() => {
											setToggleValue("list");
											setGrid(false);
										}}
									>
										<ViewListIcon />
									</ToggleButton>
								</ToggleButtonGroup>
							</div>
						</div>
						<Grid container>
							{products.map((product, index) => (
								<Grid key={index} item xs={6} md={grid ? 4 : 5} lg={3}>
									<ProductCard product={product} />
								</Grid>
							))}
						</Grid>
					</div>
				</div>
			</Container>
		</>
	);
};

export async function getServerSideProps(context) {
	const { query } = context.query;
    const response = await axios.post(`${base_url}/search`,{query})
	let products = response.data.products

	return {
		props: { products }, // will be passed to the page component as props
	};
}

export default SearchProducts;