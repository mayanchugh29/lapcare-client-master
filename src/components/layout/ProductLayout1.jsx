import React from "react";

import { Box, Typography, Button } from "@material-ui/core";

import styles from "../../../styles/componentStyles/ProductLayout1.module.css";

import encodeUrl from "../../helpers/url";
import Image from "next/image";
import Link from "next/link";

export default function ProductLayout1(props) {
	return (
		<Box className={styles.product_container}>
			<Link href={`/product/${encodeUrl(props.p_title)}/${props.sku}`}>
				<a>
					<Image
						src={props.src}
						alt="product image"
						width={100}
						height={100}
						layout="responsive"
						className={styles.product_image}
					/>
				</a>
			</Link>
			<Box className={styles.productNamePricingdiv}>
				<Typography variant="body1" className={styles.p_title_class}>
				<Link href={`/product/${encodeUrl(props.p_title)}/${props.sku}`}><a>{props.p_title}<br /> {props.product_price ? "Rs. " + props.product_price : ""}</a></Link>
				</Typography>

				<Button
					disableElevation
					color="secondary"
					background="primary"
					variant="contained"
					size="small"
					className={styles.buttonprod}
					href={`https://www.lapcare.com/collections/all?sort_by=title-ascending`}
				>
					Browse Products
				</Button>
			</Box>
		</Box>
	);
}
