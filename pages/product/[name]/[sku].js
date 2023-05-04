import React from "react";
import styles from "../../../styles/Product.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { base_url } from "../../../src/middlewares/axios/baseUri";
import CryptoJS from "crypto-js";
import * as gtag from '../../../src/helpers/gtag'

//Redux Imports
import { CHECKOUT_PRODUCT } from "../../../src/store/actionTypes/checkout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../src/store/actionCreators/cart";
import { SET_TOASTIFY } from "../../../src/store/actionTypes/toastify";

//Material Ui Imports
import {
	Container,
	Grid,
	Typography,
	Box,
	ListItem,
	ListItemIcon,
	ListItemText,
	List,
	Button,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

//Page Components
import ProductView from "../../../src/components/product/ProductView";
import RelatedProduct from "../../../src/components/product/RelatedProduct";
import ProductHighlight from "../../../src/components/product/ProductHighlight";
import TechSpecifications from "../../../src/components/product/TechSpecifications";
import CheckPincodeAvl from "../../../src/components/product/CheckPincodeAvl";
import Description from "../../../src/components/product/ProductBanners";
import AccBreadcrumbs from "../../../src/components/common/breadcrumbs/AccBreadcrumbs";
import CustomerReviews from "../../../src/components/common/reviews/CustomerReviews";
import ReviewsInShort from "../../../src/components/common/reviews/ReviewsInShort";
import ReviewsShow from "../../../src/components/common/reviews/ReviewsShow";

const useRedux = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authReducer.token);
	const cart = useSelector((state) => state.cartReducer);

	// for checkout action
	const checkoutHandler = (payload) =>
		dispatch({
			type: CHECKOUT_PRODUCT,
			payload: payload,
		});

	return { checkoutHandler, token, cart };
};

const ProductSingle = (props) => {
	const { data } = props;
	const dispatch = useDispatch();
	const router = useRouter();
	const { checkoutHandler, token, cart } = useRedux();
	const theme = useTheme();

	const sm = useMediaQuery(theme.breakpoints.down("sm"));

	// checkout handler function
	const handleCheckout = () => {
		const payload = {
			subtotal: props.data.sellingPrice < 500 ? props.data.sellingPrice + 49 : props.data.sellingPrice,
			tax: Math.round((18 / 100) * props.data.sellingPrice),
			discount:props.data.costPrice - props.data.sellingPrice,
			shipping: props.data.sellingPrice < 500 ? 49 : 0,
			products: [
				{
					quantity: 1,
					productPrice: props.data.sellingPrice,
					product: {
						_id: props.data._id,
						images: props.data.images,
						name: props.data.name,
						sellingPrice: props.data.sellingPrice,
						costPrice: props.data.costPrice,
					},
				},
			],
		};
		const encryptedCookie = CryptoJS.AES.encrypt(
			JSON.stringify([{ quantity: 1, product: props.data._id }]),
			"encrypt241998"
		).toString();
		const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
		Cookies.set("checkout", encryptedCookie, { expires: inFifteenMinutes });
		checkoutHandler(payload);
		gtag.event({
            action:"begin_checkout",
            category:'ecommerce',
            label:'Initiated checkout',
            value:`${props.data.sellingPrice}`
        })
		router.push("/checkout/address");
	};

	// add to cart handler function
	const handleAddToCart = async () => {
		let productExists = false;
		cart.products.forEach((element) => {
			if (element.product._id === props.data._id) {
				productExists = true;
			}
		});
		if (productExists) {
			dispatch({
				type: SET_TOASTIFY,
				payload: {
					type: "info",
					msg: "Product is already in your cart!",
					open: true,
				},
			});
		} else {
			const productOject = {
				quantity: 1,
				productPrice: props.data.sellingPrice,
				product: {
					_id: props.data._id,
					images: props.data.images,
					name: props.data.name,
					sellingPrice: props.data.sellingPrice,
					costPrice: props.data.costPrice === undefined || props.data.costPrice === null ? 0 : props.data.costPrice,
					tax: props.data.costPrice === undefined || props.data.costPrice === null ? 0 : props.data.tax,
				},
			};
			//pass down the productId and quantity as arguments
			dispatch(addToCart(productOject, token));
			gtag.event({
				action:"add_to_cart",
				category:'ecommerce',
				label:'Product added to cart',
				value:`${props.data.sellingPrice}`
			})
		}
	};
	return (
		<div>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: `${data.category.name}`, route: `/category/${data.category.name}` },
					{ routeName: `${data.name}`, route: `/product/${data.name}/${data.sku}` },
				]}
			/>
			<Container>
				<Grid container spacing={sm ? 1 : 6}>
					<Grid item xs={12} md={6}>
						<Box p={1}>
							<ProductView images={props.data.images} />
						</Box>
					</Grid>

					<Grid item xs={12} md={6} style={{ display: "flex", alignItems: "center" }}>
						<Box pt={2} className={styles.product_right_detail}>
							<Box pt={4}>
								<Typography
									variant="h5"
									color="primary"
									style={{ cursor: "pointer" }}
									gutterBottom
									onClick={() => router.push(`/category/${data.category.name}`)}
								>
									{data.category.name}
								</Typography>
								<Typography variant="h4" className={styles.product_s_title}>
									{data.name}
								</Typography>

								

								<div className={styles.product_s_pricing}>
									<p className={styles.sell_price}>&#8377; {data.sellingPrice}</p>
									<div
										style={{
											display: "flex",
											flexFlow: "column wrap",
											marginLeft: "0.3rem",
										}}
									>
										<p className={styles.product_price}>
											{" "}
											&#8377;{" "}
											{data.costPrice === undefined || data.costPrice === null ? data.sellingPrice : data.costPrice}
										</p>
										<p className={styles.discount_amount}>
											{" "}
											You save &#8377; {data.costPrice === undefined || data.costPrice === null ? 0 : data.costPrice-data.sellingPrice} (
											{(data.costPrice === undefined || data.costPrice === null
												? 0
												: Math.round(((data.costPrice - data.sellingPrice) / data.costPrice) * 100)) + "%"}
											)
										</p>
									</div>
								</div>
							</Box>
							{data.avaiblity === 1 ? (
								<div className={styles.action_buttons_container}>
									
									<a href="https://www.lapcare.com/collections/all?sort_by=title-ascending">
									<Button
										color="primary"
										variant="contained"
										disableElevation
										style={{ marginLeft: "1rem" }}
										
									>
										Browse Products
									</Button></a>
								</div>
							) : (
								<div className={styles.action_buttons_container}>
									<Button
										style={{ backgroundColor: "#e5e5e5", cursor: "not-allowed" }}
										disableElevation
										variant="contained"
									>
										Out of stock
									</Button>
								</div>
							)}

							<Box className={styles.shipping_cond_box}>
								<Grid container>
									<Grid item xs={12} sm={12} md={6}>
										<Box className={styles.l_box}>
											<div className={styles.shipping_box_header}>
												<img
													src="https://lapcare-static.s3.ap-south-1.amazonaws.com/home/shipping.png"
													className={styles.y_icons}
												/>
												<Typography variant="h6">Shipping & Delivery</Typography>
											</div>
											
											<List style={{ fontSize: "13px !important" }} component="ul" className={styles.small_info}>
												<ListItem>
													<ListItemIcon className={styles.list_icon}>
														<FiberManualRecordIcon />
													</ListItemIcon>
													<ListItemText primary="Free Delivery over &#8377;499" />
												</ListItem>
												<ListItem>
													<ListItemIcon className={styles.list_icon}>
														<FiberManualRecordIcon />
													</ListItemIcon>
													<ListItemText primary="Shipping in 24 hours" />
												</ListItem>
											</List>
										</Box>
									</Grid>
									<Grid item xs={12} sm={12} md={6}>
										<Box className={styles.r_box}>
											<div className={styles.shipping_box_header}>
												<img
													src="https://lapcare-static.s3.ap-south-1.amazonaws.com/home/returns.png"
													className={styles.y_icons}
												/>
												<Typography variant="h6">Returns & Warranty</Typography>
											</div>
											<List component="ul" className={styles.small_info}>
												<ListItem>
													<ListItemIcon className={styles.list_icon}>
														<FiberManualRecordIcon />
													</ListItemIcon>
													<ListItemText primary="7 days easy returns" />
												</ListItem>
												<ListItem>
													<ListItemIcon className={styles.list_icon}>
														<FiberManualRecordIcon />
													</ListItemIcon>
													<ListItemText primary="Delivery within 6-7 working days" />
												</ListItem>
											</List>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
			<ProductHighlight highlights={data.icons} />
			<Box p={1} id="description">
				<Description bannerImages={data.bannerImages} />
			</Box>
			<Box p={1} id="specification">
				<TechSpecifications specs={data.keys} />
			</Box>
			<Box p={1} id="reviews">
				<CustomerReviews reviews={data.reviews} />
			</Box>
			<Box p={1}>
				<ReviewsShow />
			</Box>
			<Box p={1}>
				<RelatedProduct categoryId={data.category._id} productSku={data.sku} />
			</Box>
			{/* <Box p={1} id="FAQ">
				<Faq content={props.data.faqs} />
			</Box> */}
			{data.category.name === "Laptop Batteries" ||
			data.category.name === "Laptop Adapter" ||
			data.category.name === "Toner Cartridges" ? (
				<Container maxWidth="lg">
					<div style={{ padding: "1rem 0", textAlign: "center", color: "grey", fontSize: "0.9rem" }}>
						<p>
							*The rights to the trademarks of HP, Acer, Toshiba, Apple, Dell, Asus, Sony, Compaq, Lenovo, Samsung, LG,
							HCL are reserved and owned by their respective owners.
						</p>
					</div>
				</Container>
			) : null}
			{data.avaiblity === 1 ? (
				<div className={styles.action_buttons_container_sm}>
					
					<a href="https://www.lapcare.com/collections/all?sort_by=title-ascending">
					<div
						className={styles.action_button_sm}
						style={{ backgroundColor: "#fcc101", color: "white" }}
						
					>
						<p>BUY NOW</p>
					</div></a>
				</div>
			) : (
				<div className={styles.action_buttons_container_sm}>
					<div className={styles.action_button_sm} style={{ backgroundColor: "#e5e5e5", width: "100%" }}>
						<p>OUT OF STOCK</p>
					</div>
				</div>
			)}
		</div>
	);
};

export async function getServerSideProps(context) {
	const { sku } = context.query;
	const res = await axios.get(`${base_url}/product/sku/${sku}`);
	let data = res.data.productData;

	return {
		props: { data },
	};
}

export default ProductSingle;
