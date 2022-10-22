import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { useSelector } from 'react-redux'

const home_banner_data = [
  {
    banner: "https://lapcareaws-static.s3.ap-south-1.amazonaws.com/lapscan/Lapscan+PC+Cleaner+banner+1920+x+1000-min.png",
    route: "https://lapcareaws-static.s3.ap-south-1.amazonaws.com/downloads/LSDeskCleaningTool.exe",
    auth: true
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/banner-new.jpg",
    route: "/product/LAPCARE-L-80-GAMING-MOUSE/LOMORB7871",
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/1.jpg",
    route: "/product/WINNER-Cooling-Pad-with-4-Fans-Laptop-Stand/LKSTPP7624",
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/3.jpg",
    route: "/category/Laptop-Batteries",
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/4.jpg",
    route: "/category/SSD",
  },
];

const Mobile_banner_data = [
  {
    banner: "https://lapcareaws-static.s3.ap-south-1.amazonaws.com/lapscan/Lapscan+PC+Cleaner+banner+1920+x+1000-min.png",
    route: "/download",
    auth: true
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/banner-new.jpg",
    route: "/product/LAPCARE-L-80-GAMING-MOUSE/LOMORB7871",
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/1.jpg",
    route: "/product/WINNER-Cooling-Pad-with-4-Fans-Laptop-Stand/LKSTPP7624",
  },
  {
    banner:
      "https://lapcare-static.s3.ap-south-1.amazonaws.com/home/Mobile%20Size-3.jpg",
    route: "/category/Laptop-Batteries",
  },
  {
    banner: "https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/4.jpg",
    route: "/category/ssd",
  },
];

const HomeBanner = () => {
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    dots: false,
    infinite: true,
    slide: true,
    arrow: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  let data = [];
  if (sm) {
    data = Mobile_banner_data;
  } else {
    data = home_banner_data;
  }

  const token = useSelector((state) => state.authReducer.token);

  const isAuthenticated = (data) => {
    if (data.auth !== true)
      return true
    if (token)
      return true
    return false
  }

  return (
    <Slider {...settings} xs={12}>
      {data.map((home_banner_data, ind) => (
        <div key={ind}>
          <Link href={isAuthenticated(home_banner_data) ? home_banner_data.route : "/login"}>
            <a>
              <Image
                src={home_banner_data.banner}
                height={sm ? 300 : 1000}
                width={sm ? 425 : 1920}
                alt="banner"
                layout="responsive"
              />
            </a>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default HomeBanner;
