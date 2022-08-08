import React from "react";
import styles from '../../../styles/componentStyles/ProductBanners.module.css';


import {
  Container,
} from "@material-ui/core";


export default function ProductBanners(props) {
  return (
    <Container maxWidth="lg" className={styles.parent_container}>
      {props.bannerImages.map((description_data,i) => (
        <div key={i}>
          <img
            src={description_data}
            width="100%"
            className={styles.image}
            alt="Product banners"
          />
        </div>

      ))}
    </Container>
  );
}