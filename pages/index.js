import React, { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import axios from "axios";
import { base_url } from "../src/middlewares/axios/baseUri";

//Page Components
import HomeBanner from "../src/components/home/HomeBanner";
import ThisMonthPick from "../src/components/home/ThisMonthPick";
import NewLaunches from "../src/components/home/NewLaunches";
import NewProducts from "../src/components/home/NewProducts";
import ClientTestimonials from "../src/components/home/ClientTestimonials";
import MoreProducts from "../src/components/home/MoreProducts";
import ProductSlider from "../src/components/common/productSlider/ProductSlider";
import InstagramSection from "../src/components/home/InstagramSection";
import PromotionalPopup from "../src/components/home/PromotionalPopup";

const Home = (props) => {
  const [open, setOpen] = useState(true); 
  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <meta
        name="google-site-verification"
        content="fQ7PBz_xePrvCLdqWAeAvVh5VH4NGMOZTr9kr4XePLg"
      />
      
      <PromotionalPopup open={open} setopen={setOpen} />

      <Box display="block" maxWidth="100%">
        <HomeBanner />
      </Box>
      <Container pt={2}>
        <ThisMonthPick categories={props.categories} />
        <Box id="Batteries" pt={1} pb={1} mt={4} mb={2}>
          <ProductSlider
            title="Trending Products"
            id="6164fd07232b514024ba68c6"
            numProduct="10"
            sort=""
            backgroundColor="#ffd531"
          />
        </Box>
        <NewProducts title="New Launches " />

        <Box id="Batteries" pt={1} pb={1}>
          <ProductSlider title="Batteries" id="61618a39701b4e001e445ed8" />
        </Box>
        <Box id="Adapters" pt={1} pb={1}>
          <ProductSlider title="Adapters" id="616429619d724f0d74fa31a2" />
        </Box>
        <Box pt={1} pb={1}>
          {/* <SingleProductSlider catid="61650848232b514024ba68d5" title="Keyboard & Mouse Combo" /> */}
          <NewLaunches
            catid="61650848232b514024ba68d5"
            title="Keyboard Mouse Combo"
            backgroundColor="#ffd531"
          />
        </Box>
        <Box id="Headset" pt={1} pb={1}>
          <ProductSlider title="Headset" id="6164fcd6232b514024ba68c5" />
        </Box>
        <Box id="Mouse" pt={1} pb={1}>
          <ProductSlider title="Mouse" id="6164fd5e232b514024ba68ca" />
        </Box>
        <Box>
          <MoreProducts maxWidth="lg" />
        </Box>
        <Box display="block" maxWidth="lg">
          <ClientTestimonials />
        </Box>
      </Container>
      <Box display="block" maxWidth="lg">
        <InstagramSection />
      </Box>
    </div>
    
  );
};

export async function getServerSideProps(context) {
  const res = await axios(`${base_url}/products/parent`);
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  let categories = res.data.categories;
  return {
    props: { categories }, // will be passed to the page component as props
  };
}



export default Home;
