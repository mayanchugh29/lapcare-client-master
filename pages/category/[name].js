import React, { useState, useEffect } from "react";
import styles from "../../styles/ProductCategory.module.css";
import { base_url } from "../../src/middlewares/axios/baseUri";
import axios from "axios";

//Material Ui Imports
import {
	Container,
	Grid,
	Typography,
	Button,
	TextField,
	IconButton,
	InputAdornment,
	FormControl,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ViewListIcon from "@material-ui/icons/ViewList";
import SortIcon from "@material-ui/icons/Sort";
import FilterIcon from "@material-ui/icons/FilterList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SearchIcon from "@material-ui/icons/Search";

//Components Imports
import Filter from "../../src/components/category/Filter";
import ProductCard from "../../src/components/category/ProductCard";
import SortModal from "../../src/components/category/SortModal";
import FilterModal from "../../src/components/category/FilterModal";
import Sort from "../../src/components/category/Sort";
import AccBreadcrumbs from "../../src/components/category/AccBreadcrumb";
import BannerSingle from "../../src/components/common/banner/BannerSingle";

const ProductCategory = (props) => {
	const [initialProducts, setinitialProducts] = useState(props.products);
	const [products, setproducts] = useState(props.products);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setproducts(props.products);
		setinitialProducts(props.products);
	}, [props.products]);

	useEffect(() => {
		if (props.category.name === "Laptop Batteries") {
			if (searchTerm.length > 2) {
				let searchArray = [];
				initialProducts.map((product) => {
					let compatiblityArray = product.keys[5].value.split(",");
					for (let i = 0; i < compatiblityArray.length; i++) {
						if (compatiblityArray[i].toLowerCase().includes(searchTerm.toLowerCase())) {
							searchArray.push(product);
							break;
						}
					}
				});
				setproducts(searchArray);
			} else {
				setproducts(initialProducts);
			}
		} else {
			if (searchTerm.length > 2) {
				let searchArray = initialProducts.filter(
					(product) => !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())
				);
				setproducts(searchArray);
			} else {
				setproducts(initialProducts);
			}
		}
	}, [searchTerm]);

	const [toggleValue, setToggleValue] = useState("grid");
	const [grid, setGrid] = useState(true);

	const [openSortModal, setOpenSortModal] = useState(false);
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const openSortModalHandler = () => {
		setOpenSortModal(true);
	};

	const closeSortModalHandler = () => {
		setOpenSortModal(false);
	};

	const openFilterModalHandler = () => {
		setOpenFilterModal(true);
	};

	const closeFilterModalHandler = () => {
		setOpenFilterModal(false);
	};

	const handleSearchTermChange = (event) => {
		setTimeout(() => {
			setSearchTerm(event.target.value);
		}, 1000);
	};

	return (
		<>
			<BannerSingle imgsrc={props.category.images.lg} />
			<AccBreadcrumbs href={props.category.name} label={props.category.name} />

			<Container className={styles.root}>
				<div className={styles.mainSection}>
					<div className={styles.filtersSection}>
						<Filter
							filters={props.category.attributes}
							categoryId={props.category._id}
							category={props.category.name}
							setproducts={setproducts}
							products={products}
							initialProducts={initialProducts}
						/>
					</div>
					<div className={styles.productsSection}>
						<SortModal
							open={openSortModal}
							onClose={closeSortModalHandler}
							setproducts={setproducts}
							products={products}
						/>
						<FilterModal
							open={openFilterModal}
							onClose={closeFilterModalHandler}
							filters={props.category.attributes}
							categoryId={props.category._id}
							category={props.category.name}
							setproducts={setproducts}
							products={products}
							initialProducts={initialProducts}
						/>
						<div className={styles.filterButtonContainer}>
							<Button startIcon={<SortIcon />} variant="outlined" onClick={openSortModalHandler}>
								Sort
							</Button>
							<Button startIcon={<FilterIcon />} variant="outlined" onClick={openFilterModalHandler}>
								Filter
							</Button>
						</div>
						<div className={styles.headingContainer}>
							<Typography style={{ fontSize: "14px", fontWeight: "500" }}>{products.length} Products</Typography>

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

						<div className={styles.searchFieldSm}>
									<FormControl style={{width:"90%"}}>
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
											fullWidth
										/>
									</FormControl>
						</div>
						
						<Grid container>
							{products.map((product, index) => (
								<Grid key={index} item xs={6} md={grid ? 4 : 10} lg={4}>
									<ProductCard product={product} category={props.category.name} />
								</Grid>
							))}
						</Grid>
					</div>
				</div>
				{props.category.name === "Laptop Batteries" ||
				props.category.name === "Laptop Adapter" ||
				props.category.name === "Toner Cartridges" ? (
					<Container maxWidth="lg">
						<div style={{ padding: "1rem 0", textAlign: "center", color: "grey", fontSize: "0.9rem" }}>
							<p>
								*The rights to the trademarks of HP, Acer, Toshiba, Apple, Dell, Asus, Sony, Compaq, Lenovo, Samsung,
								LG, HCL are reserved and owned by their respective owners.
							</p>
						</div>
					</Container>
				) : null}
			</Container>
		</>
	);
};

export async function getServerSideProps(context) {
	const { name } = context.query;
	const res = await axios.get(`${base_url}/products/${name.replace(/-/g, " ")}`);
	if (res.status === 404) {
		return {
			notFound: true,
		};
	}

	let products = res.data.products;
	let category = res.data.category;

	return {
		props: { products, category }, // will be passed to the page component as props
	};
}

export default ProductCategory;
