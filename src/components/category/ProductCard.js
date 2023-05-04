import React from "react";
import router from "next/router";
import { Button, Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import styles from "../../../styles/ProductCategory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actionCreators/cart";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";
import Image from "next/image";
import Link from "next/link";
import encodeUrl from "../../helpers/url.js";
import * as gtag from '../../helpers/gtag'

const ProductCard = ({ product,category }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authReducer.token);
	const cart = useSelector((state) => state.cartReducer);

	const handleAddToCart = (product) => {
		let productExists = false;
		cart.products.forEach((element) => {
			if (element.product._id === product._id) {
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
				productPrice: product.sellingPrice,
				product: {
					_id: product._id,
					images: product.images,
					name: product.name,
					sellingPrice: product.sellingPrice,
					costPrice: product.costPrice,
				},
			};
			//pass down the productId and quantity as arguments
			dispatch(addToCart(productOject, token));
			gtag.event({
				action:"add_to_cart",
				category:'ecommerce',
				label:'Product added to cart',
				value:`${product.sellingPrice}`
			})
		}
	};

	const trunkateProductName = (product)=>{
		if(category === 'Laptop Batteries' || category === 'Laptop Adapter' || category === 'Toner Cartridges'){
			return product.name
		}else{
			return product.name.length > 50 ? product.name.slice(0, 50) + "..." : product.name
		}
	}
	return (
		<div className={styles.productCard}>
			<div className={styles.productImage}>
				<Link href={`/product/${encodeUrl(product.name)}/${product.sku}`}>
					<a>
						{" "}
						<Image src={product.images[0]} alt={product.name} width={29} height={29} layout="responsive" />
					</a>
				</Link>
			</div>
			<div className={styles.productDescription}>
				<Typography
					variant="body1"
					className={styles.productName}
					style={{ fontWeight: "400" }}
					onClick={() => router.push(`/product/${encodeUrl(product.name)}/${product.sku}`)}
				>
					{trunkateProductName(product)}
				</Typography>
				
                <div className={styles.productPriceContainer}>
				<Typography variant="h6" className={styles.productPrice} style={{ fontWeight: "600" }}>
					<span>&#8377; {product.sellingPrice}</span>
				</Typography>
				<Typography variant="h6" className={styles.productCostPrice} style={{ fontWeight: "500" }}>
					<span>&#8377; {product.costPrice}</span>
				</Typography>
				</div>
				{product.avaiblity === 1 ? (
					<a href="https://www.lapcare.com/collections/all?sort_by=title-ascending">
					<Button
						className={styles.addToCartButton}
						color="primary"
						variant="outlined"
						
					>
						Browse Products
					</Button></a>
				) : (
					<a href="https://www.lapcare.com/collections/all?sort_by=title-ascending">
					<Button
						className={styles.addToCartButton}
						color="primary"
						variant="outlined"
						
					>
						Browse Products
					</Button></a>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
