import React,{useEffect , useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductLayout from '../category/ProductCard'

import {
	Container,
	Grid,
	Box,
	Typography,
} from "@material-ui/core";


import styles from "../../../styles/Product.module.css";
import request from "../../middlewares/axios/get";


const RelatedProduct = (props) => {
	var settings = {
		dots: true,
		navs: true,
		swipeToSlide: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
		  {
			breakpoint: 1024,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  infinite: true,
			  dots: true,
			},
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2,
			  initialSlide: 2,
			},
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  autoplay: true,
			},
		  },
		],
	  };
	const [products, setproducts] = useState([])
	useEffect(() => {
		const fetchRelatedProducts= async()=>{
			const response = await request(`/products/category/${props.categoryId}`);
			if(response.status === 200 ){
				setproducts(response.data.products)
			}
		}
		fetchRelatedProducts()		
	}, [])
	return (
		
		products.length>3?
		<Container className={styles.related_product} maxWidth="lg">
		<Grid container spacing={4} justifyContent="center">
			<div style={{display:"flex",justifyContent:"flex-start",flexFlow:"column wrap"}}>
					<Typography variant="h3" align="center" gutterBottom>
						Related Products
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						You may like these Products
					</Typography>
			</div>

			<Grid item xs={12}>
				<Box className={styles.home_product_slide_inn} >
					<Slider {...settings} className={styles.slider_outer}>
						{products.map((product, index) => (
							product.sku !== props.productSku?
							<div className={styles.slide_item} key={index}>
								<ProductLayout product={product} />
							</div>:null
						))}
					</Slider>
				</Box>
			</Grid>
		</Grid>
		</Container>
		:null
		
	);
};

export default RelatedProduct;
