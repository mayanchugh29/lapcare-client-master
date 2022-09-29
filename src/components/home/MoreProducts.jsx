import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  Grid,
} from "@material-ui/core";
import Image from "next/dist/client/image";

import SectionTitleLayout1 from "../layout/SectionTitleLayout1";
import Link from 'next/link'

const banner_data = [

  {
    banner: 'https://lapcare-static.s3.ap-south-1.amazonaws.com/home/product_bann_001.jpg',
    route: '/product/LAPCARE-USB-SPEAKER-3W*2-LUS-040/LKAMBLUS7431'
  },
  {
    banner: 'https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/5.jpg',
    route: '/product/LAPCARE-USB-SPEAKER-3W*2-LUS-040/LKAMBLUS7431'
  }, {
    banner: 'https://lapcare-static.s3.ap-south-1.amazonaws.com/banner/6.jpg',
    route: '/product/LAPCARE-USB-SPEAKER-3W*2-LUS-040/LKAMBLUS7431'
  },

]



const MoreProducts = () => {
  return (
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <SectionTitleLayout1 title_class="center_title_outer" title_text="More Products" />
          </Grid>

          <Grid container spacing={1} style={{ paddingTop: "20px" }}>

            <Grid item xs={12} lg={6}>
              <Link href="/category/motherboard" >
                <a>
                  <Image src={banner_data[0].banner} height={800} width={920} alt="banner" layout='responsive'  />
                </a>
              </Link>

            </Grid>

            <Grid item xs={12} lg={6}>
              <Grid container spacing={1}  >
                <Grid item xs={12}>
                  <Link href="/product/-USB-3.0-4-Port-HUB-with-30cm-Cable/LRBUPH7128" >
                    <a>

                      <Image src={banner_data[1].banner} height={460} width={1080} alt="banner" layout='responsive' />
                    </a>
                  </Link>
                </Grid>
                <Grid item xs={12} >

                  <Link href="/product/-Lapcam-web-camera-HD-720P/LKWCAM7298" >
                    <a>
                      <Image src={banner_data[2].banner} height={460} width={1080} alt="banner" layout='responsive' />
                    </a>
                  </Link>


                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
  );
};

export default MoreProducts;