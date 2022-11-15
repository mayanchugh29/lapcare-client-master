import React from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/Antivirus.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { base_url } from "../../../src/middlewares/axios/baseUri";
import CryptoJS from "crypto-js";

//Redux Imports
import { CHECKOUT_PRODUCT } from "../../../src/store/actionTypes/checkout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../src/store/actionCreators/cart";
import { SET_TOASTIFY } from "../../../src/store/actionTypes/toastify";

//Material Ui Import
import { Typography, Button, Container } from "@material-ui/core";

//Components Import
import AccBreadcrumbs from "../../../src/components/common/breadcrumbs/AccBreadcrumbs";
import Description from "../../../src/components/antivirus/Description";


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


const Antivirus = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { checkoutHandler, token, cart } = useRedux();


	const handleCheckout = () => {
		const payload = {
			subtotal:props.data.sellingPrice,
			tax: Math.round((18 / 100) * props.data.costPrice),
			discount: props.data.costPrice - props.data.sellingPrice,
			shipping: 0,
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
					costPrice: props.data.costPrice,
					tax:18,
				},
			};
			//pass down the productId and quantity as arguments
			dispatch(addToCart(productOject, token));
		}
	};

	return (
		<div>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
				]}
			/>
			<Container>
				<div className={styles.titleSection}>
					<div className={styles.imageContainer}>
						<img
							src={props.data.images[0]}
							alt="Antivirus Image"
						/>
					</div>
					<div className={styles.detailsContainer}>
						<Typography className={styles.categoryName}>Antivirus</Typography>
						<Typography className={styles.productName}>{props.data.name} </Typography>
						<p style={{fontSize:"16px",fontWeight:"500"}}>(Email Delivery in 1-2 working days- No CD)</p>
						<div className={styles.priceContainer}>
							<Typography className={styles.sellingPrice}>&#8377; {props.data.sellingPrice}</Typography>
							<div
										style={{
											display: "flex",
											flexFlow: "column wrap",
											marginLeft: "0.3rem",
										}}
									>
										<p className={styles.product_price}>
											{" "}
											&#8377;{" "}<del>
											{props.data.costPrice === undefined || props.data.costPrice === null ? props.data.sellingPrice : props.data.costPrice}</del>
										</p>
										<p className={styles.discount_amount}>
											{" "}
											You save &#8377; {props.data.costPrice === undefined || props.data.costPrice === null ? 0 : props.data.costPrice-props.data.sellingPrice} (
											{(props.data.costPrice === undefined || props.data.costPrice === null
												? 0
												: Math.round(((props.data.costPrice - props.data.sellingPrice) / props.data.costPrice) * 100)) + "%"}
											)
										</p>

									
							</div>
						</div>
						{props.data.avaiblity === 1 ? (
								<div className={styles.action_buttons_container}>
									<Button color="primary" variant="outlined" onClick={handleAddToCart}>
										Add to cart
									</Button>

									<Button
										color="primary"
										variant="contained"
										disableElevation
										style={{ marginLeft: "1rem" }}
										onClick={handleCheckout}
									>
										Buy Now
									</Button>
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
							<p style={{fontWeight:"500",color:"grey"}}>(Your activation code along with the download link will be sent to you on your registered Email in 1-2 working days.)</p>
					</div>
				</div>
				<div className={styles.buttonContainer}>
							<Button
							    disableElevation
								onClick={()=>router.push(`${props.data.downloads[0]}`)}
								className={styles.downloadButton}
								variant="contained"
								color="primary"
							>
								Download Trial Version
							</Button>
											
							<Button
							    disableElevation
								onClick={()=>router.push(`${props.data.downloads[1]}`)}
								className={styles.downloadButton}
								variant="contained"
								color="primary"
								style={{ 'margin-left': "5px", 'margin-right': "5px" }}
							>
								Download Windows 7 Trial Version
							</Button>
								
						
							<Button
							    disableElevation
								onClick={()=>router.push(`${props.data.downloads[2]}`)}
								className={styles.downloadButton}
								variant="contained"
								color="primary"
							>
								Download Old Version
							</Button>
						</div>
				<Description />
				{props.data.avaiblity === 1 ? (
				<div className={styles.action_buttons_container_sm}>
					<div className={styles.action_button_sm} onClick={handleAddToCart}>
						<p>ADD TO CART</p>
					</div>
					<div
						className={styles.action_button_sm}
						style={{ backgroundColor: "#fcc101", color: "white" }}
						onClick={handleCheckout}
					>
						<p>BUY NOW</p>
					</div>
				</div>
			) : (
				<div className={styles.action_buttons_container_sm}>
					<div className={styles.action_button_sm} style={{ backgroundColor: "#e5e5e5", width: "100%" }}>
						<p>OUT OF STOCK</p>
					</div>
				</div>
			)}
			</Container>
		</div>
	)
}


export async function getServerSideProps(context) {
	const { sku } = context.query;
	const res = await axios.get(`${base_url}/product/sku/${sku}`);
	let data = res.data.productData;

	return {
		props: { data },
	};
}

export default Antivirus
