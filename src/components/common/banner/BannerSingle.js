import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

import {
  Grid
} from "@material-ui/core";


const BannersSingleImage = (props) => {
  return (
    <Grid item xs={12} >
      <Image src={props.imgsrc} alt="Page banner" width={192} height={55} layout="responsive" />
    </Grid>

  );
};

export default BannersSingleImage;
