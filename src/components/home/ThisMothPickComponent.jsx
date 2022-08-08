import { Grid, Container } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import ProductLayout1 from "../layout/ProductLayout1";
import styles from "../../../styles/componentStyles/ThisMonthPick.module.css";
import Link from "next/link";

const ThisMothPickComponent = (props) => {
	const products = props.products;

	return (
		<Container maxWidth="lg" style={{ padding: 0 }}>
			<Grid container spacing={0} style={{ padding: 2 }}>
				<Grid item xs={12} lg={6} style={{ borderRadius: "20px !Important" }}>
					<Link href={props.route}>
						<a>
							<Image src={props.banner} className={styles.bannerimg} width={480} height={610} layout="responsive" alt="category banner" objectFit='fill'  />
						</a>
					</Link>
				</Grid>

				<Grid item xs={12} lg={6}>
					<Grid container spacing={0} style={{ paddingBottom:"18px" }}>
						<Grid item xs={12} lg={6} style={{ height: "100%", width: "100%" }}>
							<ProductLayout1
								sku={products[1].sku}
								src={products[1].images[0]}
								reviews_count={products[1].reviews.length}
								p_title={products[1].name}
								sell_price={products[1].sellingPrice}
								product_price={products[1].sellingPrice}
							/>
						</Grid>

						<Grid item xs={12} lg={6} style={{ height: "100%", width: "100%" }}>
							<ProductLayout1
								sku={products[2].sku}
								src={products[2].images[0]}
								reviews_count={products[2].reviews.length}
								p_title={products[2].name}
								sell_price={products[2].sellingPrice}
								product_price={products[2].sellingPrice}
							/>
						</Grid>
						<Grid item xs={12} lg={6} style={{ height: "100%", width: "100%" }}>
							<ProductLayout1
								sku={products[3].sku}
								src={products[3].images[0]}
								reviews_count={products[3].reviews.length}
								p_title={products[3].name}
								sell_price={products[3].sellingPrice}
								product_price={products[3].sellingPrice}
							/>
						</Grid>

						<Grid item xs={12} lg={6} style={{ height: "100%", width: "100%" }}>
							<ProductLayout1
								sku={products[4].sku}
								src={products[4].images[0]}
								reviews_count={products[4].reviews.length}
								p_title={products[4].name}
								sell_price={products[4].sellingPrice}
								product_price={products[4].sellingPrice}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ThisMothPickComponent;
