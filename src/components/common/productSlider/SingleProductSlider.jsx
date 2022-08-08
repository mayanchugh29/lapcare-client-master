import React, { useEffect, useState } from "react";
import request from "../../../middlewares/axios/get";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container, Grid, Box, Typography } from "@material-ui/core";

import Image from "next/image";

import ButtonLayout1 from "../../layout/ButtonLayout1";
import SectionTitleLayout1 from "../../layout/SectionTitleLayout1";
import { useRouter } from "next/router";

const SingleProductSlider = (props) => {
	const [products, setproducts] = useState([]);
	const router = useRouter();
	useEffect(() => {
		const getProducts = async () => {
			const id = props.catid;
			const response = await request(`/products/category/${id}`);
			if (response.status === 200) {
				setproducts(response.data.products);
			}
		};

		getProducts();
	}, []);

const sinleslidersettings = {
		dots: false,
		navs: true,
		swipeToSlide: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
		
		],
	};
	return (
		<Container maxWidth="lg">
			<Grid container spacing={4} justifyContent="center">
				<Grid item md={12}>
					<SectionTitleLayout1 title_class="center_title_outer" title_text={props.title} />
				</Grid>

				<Box style={{ width: "100%", background: "#f2f2f2", padding: "30px" }}>
					<Slider {...sinleslidersettings}>
						{products.map((product, ind) => (
							<div key={ind}>
								<Box>
									<Grid container>
										<Grid item xs={12} lg={5}>
											<Box
												style={{
													height: "100%",
													display: "flex",
													flexDirection: "column",
													flexWrap: "nowrap",
													justifyContent: "center",
													alignItems: "flex-start",
													alignContent: "flex-start",
													textAlign: "left",
												}}
											>
												<Typography variant="h3">{product.name}</Typography>

												<ButtonLayout1
													btn_text="shop now"
													btn_class="c_btn_fill_dark"
													link={`/product/${product.name}/${product.sku}`}
												/>
											</Box>
										</Grid>

										<Grid item xs={12} lg={7}>
											<Box style={{ display: "block", textAlign: " -webkit-center" }}>
												<img
													src={`${product.images[0]}`}
													height={500}
													width={500}
													alt={product.name}
													layout="responsive"
												/>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</div>
						))}
					</Slider>
				</Box>
			</Grid>
		</Container>
	);
};

export default SingleProductSlider;
