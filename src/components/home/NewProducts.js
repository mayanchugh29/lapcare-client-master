import React,{useEffect,useState} from "react";
import request from '../../middlewares/axios/get'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import {
  Container,
  Grid,
  Box,
} from "@material-ui/core";
import styles from "../../../styles/componentStyles/NewLaunches.module.css";

import SectionTitleLayout1 from "../layout/SectionTitleLayout1";

import ButtonLayout1 from "../layout/ButtonLayout1";



const NewProducts =(props) => {
	const [products, setproducts] = useState([]);
	useEffect(() => {
		const getProducts = async () => {
			const response = await request(`/products/new`);
			if (response.status === 200) {
				setproducts(response.data.products);
			}
		};

		getProducts();
	}, []);


  var settings = {
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
          slidesToShow: 2,
          slidesToScroll: 1,
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
  return (
    <Container className={styles.new_launches_outer} maxWidth="lg">
      <Grid container spacing={4} justifyContent="center">


        <Grid item md={12}>
          <SectionTitleLayout1 title_class="center_title_outer" title_text={props.title}  />
        </Grid>


        <Box className={styles.new_launches_inn} pl={3} pr={3} style={{backgroundColor:props.backgroundColor,borderRadius:"1rem"}} >
          <Slider {...settings} className={styles.slider_outer} >
            {products.map((product, ind) => (
              <div className="slide_item" key={ind}>

                <Box className={styles.product_container} >
                  <Grid container>
                    <Grid item md={12} lg={5}>
                      <Box className={styles.product_pic_outer}>
                        <Image
                          src={product.images[0]}
                          className={styles.img_fluid}
                          alt="product image"
                          layout="intrinsic"
                          width={450}
                          height={450}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={7} className={styles.new_launches_desc}>
                      <Box className={styles.new_launches_desc_inn}>
                        <SectionTitleLayout1 title_class="left_subtitle_outer" title_text={product.name} />

                        <ButtonLayout1 btn_text="Shop Now" btn_class="c_btn_fill_dark" route={`/product/${product.name}/${product.sku}`} />
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

export default NewProducts