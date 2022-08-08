import React from "react";
import Slider from "react-slick";

import {
  Box, Container,
} from "@material-ui/core";

import styles from "../../../styles/componentStyles/ClientTestimonials.module.css";

import TestimonialLayout1 from "../layout/TestimonialLayout1";
import SectionTitleLayout1 from "../layout/SectionTitleLayout1";





const testimonials_data = [
  {
    name: "Jolly wireless mouse",
    testimonialsrc: 'https://lapcare.sgp1.digitaloceanspaces.com/2021-10-13T10-06-45.413ZB-2.jpg',
    description: `Been using this from a while now and I can say that this is a must-use mouse.
It is perfect in size as sometimes they can be smaller in size than expected. It isn’t noisy and that’s a win-win and is smooth in usage. The Bluetooth connectivity is great and works efficiently. I will have to say that I’m in awe of this product.`,
  },
  {
    name: "E9 Splash resistant Keyboard",
    testimonialsrc: 'https://lapcare.sgp1.digitaloceanspaces.com/2021-10-13T08-04-24.055ZE9-1.jpg',
    description: `It is a great product with Nano receiver and key indicators. It is light weight, the keys are smooth to work with and it is spill resistant. Have used it for over a month and I’m glad to say that this product hasn’t disappointed me at all.`,
  },
  {
    name: "L999 Smartoo",
    testimonialsrc: 'https://lapcare.sgp1.digitaloceanspaces.com/2021-10-13T10-35-36.081ZBK%20-4.jpg',
    description: `Best combo out there. The mouse is noise-free and built for heavy-duty usage. Keyboard is made for extensive usage and the print won’t fade off easily. 
They have so many fascinating colour options too which is really impressive. 
I have used both of them for a while and I am greatly satisfied with the quality and size.`,
  },
  {
    name: "Battery",
    testimonialsrc: 'https://lapcare.sgp1.digitaloceanspaces.com/2021-10-11T07-41-38.669ZLAOBT3C6483%20-%201.jpg',
    description: `I'm so impressed with its performance. When I charge it completely I can work for 3 to 4 hours straight. Perfect fit for HP laptops. Hope this helps.`,
  },
];

const ClientTestimonials = () => {
  let bansettings = {
    dots: false,
    navs: false,
    swipeToSlide: true,
    //infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [

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
  return (
    <Container
      className={styles.testimonials_outer}
      maxWidth="lg"
    >

      <SectionTitleLayout1 title_class="center_title_outer" title_text="Our Fans Say the Nicest Things" />

      <Box className={styles.testimonials_inn}>
        <Slider {...bansettings} className={styles.slider_outer} >
          {testimonials_data.map((testimonials_data, index) => (
            <div className={styles.slide_item} key={index}>
              <TestimonialLayout1 src={testimonials_data.testimonialsrc} name={testimonials_data.name} description={testimonials_data.description} />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default ClientTestimonials;