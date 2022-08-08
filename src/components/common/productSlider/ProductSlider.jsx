import React, { useEffect, useState } from "react";
import request from "../../../middlewares/axios/get";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Grid, Box } from "@material-ui/core";

import styles from "./../../../../styles/componentStyles/ProductSlider.module.css";

import ProductLayout1 from "../../layout/ProductLayout1";
import SectionTitleLayout1 from "../../layout/SectionTitleLayout1";

const ProductSlider = (props) => {
	const [products, setproducts] = useState([]);
	useEffect(() => {
		const getProducts = async () => {
			if (props.title === "Trending Products") {
				const response = await request("/products/trending");
				if (response.status === 200) {
					setproducts(response.data.products);
				}
			} else {
				const id = props.id;
				const response = await request(`/products/category/${id}`);
				if (response.status === 200) {
					setproducts(response.data.products);
				}
			}
		};

		getProducts();
	}, []);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		cssEase: "ease-in-out",
		touchThreshold: 100,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: false,
				},
			},
			,
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					arrows: false,
					dots: false,
				},
			},
		],
	};
	return (
		<Container className={styles.productslider} maxWidth="lg" style={{ padding: "1rem 0 3rem 1rem" }}>
			<Grid container spacing={4} justifyContent="center">
				<Grid item xs={12}>
					<SectionTitleLayout1 title_class="center_title_outer" title_text={props.title} />
				</Grid>

				<Grid
					item
					xs={12}
					style={{ backgroundColor: props.backgroundColor, borderRadius: "1rem", padding: "1rem 1rem" }}
				>
					<Box className={styles.home_product_slide_inn}>
						<Slider {...settings} className={styles.slick}>
							{products.map((product, index) => (
								<Box className={styles.slide_item} key={index} xs={12}>
									<ProductLayout1
										sku={product.sku}
										src={product.images[0]}
										reviews_count={product.reviews.length}
										p_title={product.name}
										sell_price={product.sellingPrice}
										product_price={product.sellingPrice}
									/>
								</Box>
							))}
						</Slider>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductSlider;
